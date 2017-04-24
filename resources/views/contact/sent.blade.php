@extends('master')

@section('content')

<div class="mdl-grid">		
	<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--6-col-tablet mdl-cell--1-offset-tablet mdl-cell--6-col-desktop mdl-cell--3-offset-desktop"
		 style="text-align: center;">

    	<img src="{{ asset('svg/contact-us-sent.svg') }}"
    		 alt="Message Sent"
    		 style="max-width: 540px; margin-top: -16px;">

    	<h1 class="mdl-typography--display-1" style="margin-top: 40px;">Thanks for contacting us!</h1>

    	<p class="mlb-typography--subheading">We'll get back to you as soon as possible.</p>
	</div>
</div>

@endsection