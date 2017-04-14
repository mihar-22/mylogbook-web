@extends('master')

@section('content')

<div class="mdl-layout mdl-js-layout">
	
	<div class="mdl-layout-spacer"></div>

	<main class="mdl-layout__content">

		<div class="mdl-grid">		
			<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--6-col-tablet mdl-cell--1-offset-tablet mdl-cell--6-col-desktop mdl-cell--3-offset-desktop">

		    	<img src="{{ asset('svg/password-reset-success.svg') }}" 
		    		 alt="Password Reset">

			</div>
		</div>
	
	</main>

	<div class="mdl-layout-spacer"></div>
</div>

@endsection