@extends('master')

@section('content')

<div class="mdl-grid" style="padding-bottom: 64px;">		
	<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--6-col-tablet mdl-cell--1-offset-tablet mdl-cell--6-col-desktop mdl-cell--3-offset-desktop"
		 style="text-align: center;">

    	<img src="{{ asset('svg/404.svg') }}"
    		 alt="Page Not Found"
    		 style="max-width: 540px;">

    	<h1 class="mdl-typography--display-1" style="margin-top: 0;">...</h1>

    	<p class="mlb-typography--subheading">We can't find the page you're looking for.</p>
	</div>
</div>

@endsection