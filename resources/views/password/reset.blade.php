@extends('master')

@section('content')

<div class="mdl-grid">		
	<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--6-col-tablet mdl-cell--1-offset-tablet mdl-cell--6-col-desktop mdl-cell--3-offset-desktop">

		<form id="resetForm" 
			  action="{{ url('/password/reset') }}"
			  role="form"
			  method="POST">
			  	
			{{ csrf_field() }}

			<input type="hidden" name="token" value="{{ $token }}">

			<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
				 style="width: 100%;">
				<input class="mdl-textfield__input" 
					   type="email" 
					   id="email"
					   name="email" 
					   value="{{ $email or old('email') }}"
					   required
					   disabled>

				<label class="mdl-textfield__label" for="email">Email</label>
			</div>


			<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label{{ $errors->has('password') ? ' is-invalid' : '' }}" 
				 style="width: 100%;">
				<input class="mdl-textfield__input" 
					   type="password" 
					   id="password"
					   name="password"
					   autofocus>

				<label class="mdl-textfield__label" for="password">Password</label>
				
				<span class="mdl-textfield__error">Must be greater than 6 characters</span>
			</div>

			<div style="display: flex; width: 100%; margin-top: 16px;">
				<div style="flex: 1;"></div>

				<input type="submit"
					   class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
					   value="Reset Password" />
			</div>
		</form>

	</div>
</div>

<script>
	var form = document.getElementById('resetForm');
	var email = document.getElementById('email');

	form.addEventListener('submit', function() {
		email.removeAttribute('disabled');
	}, false);
</script>

@endsection