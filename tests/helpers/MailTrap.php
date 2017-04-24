<?php

namespace Tests\Helpers;

use GuzzleHttp\Client;
use PHPUnit_Framework_Assert as PHPUnit;

class MailTrap
{
    private $client;

    private $mail;

    private $inboxId = 161320;

    private $apiToken = 'ca848eb4ec8b1be5f922f8d3c8a398c8';

    private function requestClient() {
        if (! $this->client)
        {
            $this->client = new Client([
                'base_uri' => 'https://mailtrap.io',
                'headers' => ['Api-Token' => $this->apiToken]
            ]);
        }

        return $this->client;
    }

    private function getMessagesUrl()
    {
        return "/api/v1/inboxes/{$this->inboxId}/messages";
    }

    private function getCleanInboxUrl()
    {
        return "/api/v1/inboxes/{$this->inboxId}/clean";
    }

    public function fetchInbox()
    {
        return $this->requestClient()
                    ->get($this->getMessagesUrl())
                    ->getBody();
    }

    public function fetchMostRecentMail()
    {
        $this->mail = json_decode($this->fetchInbox())[0];

        return $this;
    }

    public function assertSentTo($to)
    {
        PHPUnit::assertEquals($to, $this->mail->to_email);

        return $this;
    }

    public function assertSubjectIs($subject)
    {
        PHPUnit::assertEquals($subject, $this->mail->subject);

        return $this;        
    }

    public function assertTextContains($contains)
    {
        PHPUnit::assertContains($contains, $this->mail->text_body);

        return $this;
    }

    public function assertBodyContains($contains)
    {
        PHPUnit::assertContains($contains, $this->mail->html_body);

        return $this;
    }

    public function cleanInbox() {
        $this->requestClient()
             ->patch($this->getCleanInboxUrl(), ['future' => true]);
    }
}