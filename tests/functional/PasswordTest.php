<?php

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PasswordTest extends TestCase
{
	use DatabaseMigrations;

    private $mailTrap;

    private $user;

    public function setUp()
    {
        parent::setUp();

        $this->mailTrap = new MailTrap();

        $this->user = factory(User::class)->create();
    }

    public function tearDown()
    {
        parent::tearDown();

        $this->mailTrap->cleanInbox();
    }

    /** @test */
    public function i_can_reset_my_password()
    {
        $oldPassword = 'secret';

        $newPassword = 'new secret';

        $this->requestPasswordReset();

        $this->seeInDatabase('password_resets', ['email' => $this->user->email]);

        $this->mailTrap->fetchMostRecentMail()
             ->assertSentTo($this->user->email)
             ->assertSubjectIs('Reset Password')
             ->assertBodyContains($this->getPasswordResetLink());

        $this->visit($this->getPasswordResetLink())
             ->type($newPassword, 'password')
             ->press('Reset Password')
             ->see('Password reset complete!');

        $this->assertFalse(Auth::guard('web')->attempt(['email' => $this->user->email, 'password' => $oldPassword]));

        $this->assertTrue(Auth::guard('web')->attempt(['email' => $this->user->email, 'password' => $newPassword]));        
    }

    private function getEndPoint($action)
    {
        return "api/v1/auth/{$action}";
    }

    private function getPasswordResetLink()
    {
        $encodedEmail = urlencode($this->user->email);

        return "password/reset/{$encodedEmail}/{$this->getPasswordResetToken()}";
    }

    private function getPasswordResetToken()
    {
        return DB::table('password_resets')->where('email', $this->user->email)->first()->token;
    }

    private function requestPasswordReset()
    {
        $this->post($this->getEndPoint('forgot'), ['email' => $this->user->email]);    	
    }
}