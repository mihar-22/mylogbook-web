<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Chrome;
use Tests\DuskTestCase;
use Tests\Helpers\MailTrap;

class ContactTest extends DuskTestCase
{
	use DatabaseMigrations;

    private $mailTrap;

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
    public function i_can_contact_customer_support()
    {
        $this->browse(function ($browser) {
            $browser->visit('contact-us')
                    ->type('name', 'John Doe')
                    ->type('email', 'john_doe@test.com')
                    ->type('message', 'I have an issue.')
                    ->press('Send')
                    ->assertSee('Thanks for contacting us!');
        });

        $this->mailTrap->fetchMostRecentMail()
             ->assertSentTo('support+help@mylb.com.au')
             ->assertSubjectIs('Help: John Doe (john_doe@test.com)')
             ->assertTextContains('I have an issue.');
    }    
}