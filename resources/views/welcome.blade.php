@extends('master')

@section('content')

<div class="mdl-grid">		
	<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--6-col-tablet mdl-cell--1-offset-tablet mdl-cell--6-col-desktop mdl-cell--3-offset-desktop"
		 style="text-align: center;">

    	<img src="{{ asset('svg/coming-soon.svg') }}"
    		 alt="Page Not Found"
    		 style="max-width: 500px;">

    	<h1 class="mdl-typography--display-2" style="margin-top: 40px;">Coming Soon</h1>

    	<p class="mlb-typography--subheading">I know you're excited, just sit tight and wait!</p>
	</div>
</div>

@endsection