<?php

namespace App\Http\Controllers;

use App\Facades\ApiResponder;
use App\Http\Requests\Contact\SendMessage;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function showContactUsForm()
    {
        return view('contact.general');
    }

    public function sendMessage(SendMessage $request)
    {
        Mail::raw($request->message, function ($message) use ($request) {
            $topic = strtolower($request->topic);

            $message->to("support+{$topic}@mylb.com.au")
                    ->subject("{$request->topic}: {$request->name} ({$request->email})");
        });

        return ApiResponder::respondWithMessage('message sent')
                             ->setStatusCode(200);
    }
}
