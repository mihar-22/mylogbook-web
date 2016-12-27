<?php

use App\Models\User;
use App\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

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
        $this->registerUser();

        $this->seeJsonContains(['message' => 'confirmation email sent'])
             ->assertResponseStatus(201);

        Notification::assertSentTo(User::find(1), VerifyEmail::class);

        $this->seeInDatabase('users', $this->user->toArray());
    }

    /** @test */
    public function login()
    {
        $this->user->confirmEmail();

        $this->attemptLogin();

        $this->seeJsonContains(['data' => ['api_token' => User::find(1)->api_token]])
             ->assertResponseStatus(200);
    }

    /** @test */
    public function login_with_invalid_credentials()
    {
        $this->user->confirmEmail();

        $this->credentials['password'] = 'bad secret';

        $this->attemptLogin();

        $this->seeJsonContains(['message' => 'invalid credentials'])
             ->assertResponseStatus(400);
    }

    /** @test */
    public function login_with_unverified_email()
    {
        $this->user->save();

        $this->attemptLogin();

        $this->seeJsonContains(['message' => 'invalid credentials'])
             ->assertResponseStatus(400);
    }

    /** @test */
    public function logout()
    {
        $this->user->confirmEmail();

        $this->actingAs($this->user)
             ->attemptLogout();

        $this->seeJsonContains(['message' => 'user logged out'])
             ->assertResponseStatus(200);        
    }

    /** @test */
    public function logout_without_authentication()
    {
        $this->attemptLogout();

        $this->seeJsonContains(['message' => 'unauthenticated'])
             ->assertResponseStatus(401);
    }

    /** @test */
    public function verify_email()
    {
        $this->registerUser();

        $token = DB::table('email_validations')->where('email', $this->user->email)->first()->token;

        $endPoint = "email/verify/{$this->user->email}/{$token}";

        $this->seeInDatabase('users', ['email' => $this->user->email, 'is_verified' => 0]);

        $this->get($endPoint);

        $this->see('Email verified!');

        $this->seeInDatabase('users', ['email' => $this->user->email, 'is_verified' => 1]);
    }

    /** @test */
    public function verify_email_with_invalid_data()
    {
        $this->get("email/verify/badEmail/badToken");

        $this->assertResponseStatus(404);
    }

    private function getEndPoint($extension)
    {
        return "api/v1/auth/{$extension}";
    }

    private function registerUser()
    {        
        $newUser = array_merge($this->user->toArray(), ['password' => 'secret']);

        $this->post($this->getEndPoint('register'), $newUser);    
    }

    private function attemptLogin()
    {
        $this->postJson($this->getEndPoint('login'), $this->credentials);               
    }

    private function attemptLogout()
    {
        $this->getJson($this->getEndPoint('logout'));               
    }
}