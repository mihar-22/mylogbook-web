<?php

namespace Tests\Integration;

use App\Models\User;
use App\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class AuthTest extends TestCase
{
	use DatabaseMigrations;

    private $user;

    private $credentials;

    public function setUp()
    {
        parent::setUp();

        Notification::fake();

        $this->user = factory(User::class)->states('not verified')->make();

        $this->credentials = [
            'email' => $this->user->email,
            'password' => 'secret'
        ];
    }

    /** @test */
    public function register()
    {
        $response = $this->registerUser();

        $response->assertJson(['message' => 'confirmation email sent'])
                 ->assertStatus(201);

        Notification::assertSentTo(User::find(1), VerifyEmail::class);

        $this->assertDatabaseHas('users', $this->user->toArray());
    }

    /** @test */
    public function check_authenticated()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)
                         ->getJson($this->getEndPoint('check'));               

        $response->assertJson(['message' => 'authenticated'])
                 ->assertStatus(200);
    }

    /** @test */
    public function check_unauthenticated()
    {
        $user = factory(User::class)->create();

        $token = $user->api_token;

        $user->invalidateApiToken();

        $response = $this->getJson($this->getEndPoint('check'), ['Authorization' => "Bearer {$token}"]);               

        $response->assertJson(['message' => 'unauthenticated'])
                 ->assertStatus(401);
    }

    /** @test */
    public function login()
    {
        $this->user->confirmEmail();

        $response = $this->attemptLogin();

        $response->assertJson(['data' => [
            'id' => $this->user->id,
            'name' => $this->user->name,
            'api_token' => User::find(1)->api_token,
            'birthday' => $this->user->birthday
        ]])->assertStatus(200);
    }

    /** @test */
    public function login_with_invalid_credentials()
    {
        $this->user->confirmEmail();

        $this->credentials['password'] = 'bad secret';

        $response = $this->attemptLogin();

        $response->assertJson(['message' => 'invalid credentials'])
                 ->assertStatus(400);
    }

    /** @test */
    public function login_with_unverified_email()
    {
        $this->user->save();

        $response = $this->attemptLogin();

        $response->assertJson(['message' => 'invalid credentials'])
                 ->assertStatus(400);
    }

    /** @test */
    public function logout()
    {
        $this->user->confirmEmail();

        $response = $this->actingAs($this->user)
                         ->attemptLogout();

        $response->assertJson(['message' => 'user logged out'])
                 ->assertStatus(200);        
    }

    /** @test */
    public function logout_without_authentication()
    {
        $response = $this->attemptLogout();

        $response->assertJson(['message' => 'unauthenticated'])
                 ->assertStatus(401);
    }

    /** @test */
    public function verify_email()
    {
        $this->registerUser();

        $this->assertDatabaseHas('users', ['email' => $this->user->email, 'is_verified' => 0]);

        $token = DB::table('email_validations')->where('email', $this->user->email)->first()->token;

        $response = $this->get("email/verify/{$this->user->email}/{$token}");

        $response->assertSee('email-verified-success.svg');

        $this->assertDatabaseHas('users', ['email' => $this->user->email, 'is_verified' => 1]);
    }

    /** @test */
    public function verify_email_with_invalid_data()
    {
        $response = $this->get("email/verify/badEmail/badToken");

        $response->assertStatus(404);
    }

    private function getEndPoint($action)
    {
        return "api/v1/auth/{$action}";
    }

    private function registerUser()
    {        
        $newUser = array_merge($this->user->toArray(), ['password' => 'secret']);

        return $this->post($this->getEndPoint('register'), $newUser);    
    }

    private function attemptLogin()
    {
        return $this->postJson($this->getEndPoint('login'), $this->credentials);               
    }

    private function attemptLogout()
    {
        return $this->getJson($this->getEndPoint('logout'));               
    }
}