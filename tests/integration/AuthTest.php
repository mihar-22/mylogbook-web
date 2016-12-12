<?php

use App\Models\User;
use App\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class AuthTest extends TestCase
{
	use DatabaseMigrations;

    private $user = [
        'name' => 'John',
        'email' => 'john@gmail.com',
        'password' => 'secret'
    ];

    public function setUp()
    {
        parent::setUp();

        Notification::fake();
    }

    /** @test */
    public function register()
    {
        $this->registerNewUser();

        $this->seeJsonContains(['message' => 'confirmation email sent'])
             ->assertResponseStatus(201);

        Notification::assertSentTo($this->getUser(), VerifyEmail::class);

        $this->seeInDatabase('users', ['name' => $this->user['name'], 'email' => $this->user['email']]);
    }

    /** @test */
    public function login()
    {
        User::create($this->user)->confirmEmail();

        $this->attemptLogin();

        $this->seeJsonContains(['data' => ['api_token' => $this->getUser()->api_token]])
             ->assertResponseStatus(200);
    }

    /** @test */
    public function login_with_invalid_credentials()
    {
        User::create($this->user)->confirmEmail();

        $this->user['password'] = 'incorrect secret';

        $this->attemptLogin();

        $this->seeJsonContains(['message' => 'invalid credentials'])
             ->assertResponseStatus(400);
    }

    /** @test */
    public function login_with_unverified_email()
    {
        User::create($this->user);

        $this->attemptLogin();

        $this->seeJsonContains(['message' => 'invalid credentials'])
             ->assertResponseStatus(400);
    }

    /** @test */
    public function logout()
    {
        User::create($this->user)->generateApiToken();

        $this->attemptLogout($this->getUser()->api_token);

        $this->seeJsonContains(['message' => 'user logged out'])
             ->assertResponseStatus(200);        
    }

    /** @test */
    public function logout_without_authentication()
    {
        $this->attemptLogout('invalidToken');

        $this->seeJsonContains(['message' => 'unauthenticated'])
             ->assertResponseStatus(401);
    }

    /** @test */
    public function verify_email()
    {
        $this->registerNewUser();

        $token = DB::table('email_validations')->where('email', $this->user['email'])->first()->token;

        $endPoint = "email/verify/{$this->user['email']}/{$token}";

        $this->seeInDatabase('users', ['email' => $this->user['email'], 'is_verified' => 0]);

        $this->get($endPoint);

        $this->see('Email verified!');

        $this->seeInDatabase('users', ['email' => $this->user['email'], 'is_verified' => 1]);
    }

    /** @test */
    public function verify_email_with_invalid_data()
    {
        $this->get("email/verify/false/123");

        $this->assertResponseStatus(404);
    }

    private function getUser()
    {
        return User::find(1);
    }

    private function getEndPoint($extension)
    {
        return "api/v1/users/{$extension}";
    }

    private function registerNewUser()
    {
        $this->postJson($this->getEndPoint('register'), $this->user);    	
    }

    private function attemptLogin()
    {
        $this->postJson($this->getEndPoint('login'), $this->user);               
    }

    private function attemptLogout($token)
    {
        $this->postJson($this->getEndPoint('logout'), $this->user, ['Authorization' => "Bearer {$token}"]);               
    }
}