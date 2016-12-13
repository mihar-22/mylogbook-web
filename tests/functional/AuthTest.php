<?php

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\DB;

class AuthTest extends TestCase
{
	use DatabaseMigrations;

    private $mailTrap;

    private $user;

    public function setUp()
    {
        parent::setUp();

        $this->mailTrap = new MailTrap();

        $this->user = factory(User::class)->states('not verified')->make();
    }

    public function tearDown()
    {
        parent::tearDown();

        $this->mailTrap->cleanInbox();
    }

    /** @test */
    public function i_can_register()
    {
    	$this->registerNewUser();
        
		$this->seeInDatabase('users', ['email' => $this->user->email, 'is_verified' => 0]);

        $this->mailTrap->fetchMostRecentMail()
             ->assertSentTo($this->user->email)
             ->assertSubjectIs('Verify Email')
             ->assertBodyContains($this->getEmailVerificationLink());

        $this->visit($this->getEmailVerificationLink())
             ->see('Email verified!');  

        $this->seeInDatabase('users', ['email' => $this->user->email, 'is_verified' => 1]);
    }

    private function getEndPoint($extension)
    {
        return "api/v1/users/{$extension}";
    }

    private function getEmailVerificationLink()
    {
        $encodedEmail = urlencode($this->user->email);

        return "email/verify/{$encodedEmail}/{$this->getEmailVerificationToken()}";
    }

    private function getEmailVerificationToken()
    {
        return DB::table('email_validations')->where('email', $this->user->email)->first()->token;
    }

    private function registerNewUser()
    {
        $newUser = array_merge($this->user->toArray(), ['password' => 'secret']);

        $this->post($this->getEndPoint('register'), $newUser);    	
    }
}