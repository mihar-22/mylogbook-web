@extends('master')

@section('content')

<div class="mdl-grid">		
	<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--6-col-tablet mdl-cell--1-offset-tablet mdl-cell--6-col-desktop mdl-cell--3-offset-desktop">

		<form action="{{ url('/contact-us') }}"
			  role="form"
			  method="POST">
			  	
			{{ csrf_field() }}

			<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label{{ $errors->has('name') ? ' is-invalid' : '' }}">
				<input class="mdl-textfield__input" 
					   type="text" 
					   id="name"
					   name="name" >

				<label class="mdl-textfield__label" for="name">Name</label>

				<span class="mdl-textfield__error">{{ $errors->first('name') }}</span>
			</div>

			<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label{{ $errors->has('email') ? ' is-invalid' : '' }}">
				<input class="mdl-textfield__input" 
					   type="email" 
					   id="email"
					   name="email" 
					   value="{{ old('email') }}">

				<label class="mdl-textfield__label" for="email">Email</label>

				<span class="mdl-textfield__error">{{ $errors->first('email') }}</span>
			</div>

			<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fullwidth">
				<input class="mdl-textfield__input" 
					   id="topic" 
					   name="topic" 
					   value="Help" 
					   type="text" 
					   readonly 
					   tabIndex="-1" 
					   data-val="HELP"/>

				<label class="mdl-textfield__label" for="topic">Topic</label>

				<ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu" for="topic">
					<li class="mdl-menu__item" data-val="HELP">Help</li>
					<li class="mdl-menu__item" data-val="FEEDBACK">Feedback</li>
					<li class="mdl-menu__item" data-val="BUG">Bug</li>
				</ul>
			</div>

			<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label{{ $errors->has('message') ? ' is-invalid' : '' }}">
				<textarea class="mdl-textfield__input"
					   	  type="text" 
					   	  id="message"
					   	  name="message" 
					   	  value="{{ old('message') }}"
					   	  rows="3"></textarea>

				<label class="mdl-textfield__label" for="message">Message</label>

				<span class="mdl-textfield__error">{{ $errors->first('message') }}</span>
			</div>

			<input type="submit"
				   class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
				   value="Send" />
		</form>

	</div>
</div>

@endsection