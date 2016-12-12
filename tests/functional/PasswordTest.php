<?php

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PasswordTest extends TestCase
{
	use DatabaseMigrations;

    private $mailTrap;

    private $user = [
        'name' => 'John',
        'email' => 'john@gmail.com',
        'password' => 'secret'
    ];

    public function setUp()
    {
        parent::setUp();

        $this->mailTrap = new MailTrap();
    }

    public function tearDown()
    {
        parent::tearDown();

        $this->mailTrap->cleanInbox();
    }

    /** @test */
    public function i_can_reset_my_password()
    {
        $newPassword = 'secret123';

        User::create($this->user)->confirmEmail();

        $this->requestPasswordReset();

        $this->seeInDatabase('password_resets', ['email' => $this->user['email']]);

        $this->mailTrap->fetchMostRecentMail()
             ->assertSentTo($this->user['email'])
             ->assertSubjectIs('Reset Password')
             ->assertBodyContains($this->getPasswordResetLink());

        $this->visit($this->getPasswordResetLink())
             ->type($newPassword, 'password')
             ->press('Reset Password')
             ->see('Password reset complete!');

        $this->assertTrue(Auth::guard('web')->attempt(['email' => $this->user['email'], 'password' => $newPassword]));
    }

    private function getEndPoint($extension)
    {
        return "api/v1/password/{$extension}";
    }

    private function getPasswordResetLink()
    {
        $encodedEmail = urlencode($this->user['email']);

        return "password/reset/{$encodedEmail}/{$this->getPasswordResetToken()}";
    }

    private function getPasswordResetToken()
    {
        $record = DB::table('password_resets')->where('email', $this->user['email'])->first();

        return $record->token;
    }

    private function requestPasswordReset()
    {
        $this->post($this->getEndPoint('forgot'), ['email' => $this->user['email']]);    	
    }
}