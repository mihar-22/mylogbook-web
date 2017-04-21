@extends('master')

@section('content')

<div class="mdl-grid" style="padding-bottom: 64px;">		
	<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--6-col-tablet mdl-cell--1-offset-tablet mdl-cell--6-col-desktop mdl-cell--3-offset-desktop"
		 style="text-align: center;">

    	<img src="{{ asset('svg/503.svg') }}"
    		 alt="Page Not Found"
    		 style="max-width: 540px;">

    	<h1 class="mdl-typography--display-1">Service Unavailable</h1>

    	<p class="mlb-typography--subheading">We've encountered a problem, we are working hard to fix it!</p>
	</div>
</div>

@endsection