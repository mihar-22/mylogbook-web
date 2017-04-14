@extends('master')

@section('content')

<div class="mdl-layout mdl-js-layout">
	
	<div class="mdl-layout-spacer"></div>

	<main class="mdl-layout__content">

		<div class="mdl-grid">		
			<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--6-col-tablet mdl-cell--1-offset-tablet mdl-cell--6-col-desktop mdl-cell--3-offset-desktop">

				<div class="mdl-card mdl-shadow--6dp" style="width: 100%;">
					
					<div class="mdl-card__title mdl-color--primary mdl-color-text--white">
						<h2 class="mdl-card__title-text">Reset Password</h2>
					</div>

					<div class="mdl-card__supporting-text">
						<form id="passwordResetForm" 
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
						</form>
					</div>

					<div class="mdl-card__actions mdl-card--border">
						<input form="passwordResetForm"
							   type="submit" 
							   class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" 
							   value="Reset">
					</div>
				</div>

			</div>
		</div>
	
	</main>

	<div class="mdl-layout-spacer"></div>
</div>

<script>
	var form = document.getElementById('passwordResetForm');
	var email = document.getElementById('email');

	form.addEventListener('submit', function() {
		email.removeAttribute('disabled');
	}, false);
</script>

@endsection