<?php

namespace Tests\Browser;

use Anhskohbo\NoCaptcha\Facades\NoCaptcha;
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
        //
    }
}
