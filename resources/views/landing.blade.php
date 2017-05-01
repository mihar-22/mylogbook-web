@extends('master')

@push('styles')
<style>
	button {
		background-color: white !important; 
	}

	#features__heading {
		text-align: left; 
		font-weight: 300; 
		color: #58595b;
		margin-top: 16px;
	}

	#features__downloadButton {
		height: 50px; 
		padding: 8px 20px;
		margin-bottom: 8px;
	}

	#features__downloadButton__appleLogo {
		width: 20px; 
		height: 20px; 
		padding-right: 4px; 
		padding-bottom: 7px;
	}

	#features__downloadButton__text {
		font-weight: 300;
		color: #58595b;
	}

	.features__details {
		text-align: center;
	}

	.features__details p {
		font-weight: 300;
		font-size: 14px;
	}

	.features__details img {
		max-width: 180px;
	}

	#preview__phone {
		position: relative;
		width: 322px;
		height: 673px;
		top: 50%;
		transform: translate(0, -50%);
		margin: 0 auto;
		background-image: url('png/iphone.png');
		background-size: 320px 100%;
		background-repeat: no-repeat;
	}

	#preview__video {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 268px;
		height: auto;
		transform: translate(-50.2%, -50%);
	}

	@media (max-width: 839px) {
		#features, #features__heading {
			text-align: center;
		}

		#features__heading {
			font-size: 40px;
		}

		#features .mdl-grid {
			padding-top: 0;
			margin-top: 0;
		}

		.features__details p {
			margin-bottom: 24px;
		}

		#features .features__details:nth-child(3) .mdl-cell:nth-child(2) img {
			margin-top: -20px;
		}

		#features .features__details:nth-child(3) .mdl-cell:nth-child(2) p {
			margin-top: -16px;
		}

		.features__details .mdl-cell {
	        border-bottom: 1px solid rgba(99, 114, 130, 0.15);
	        padding-top: 16px;
	        padding-bottom: 54px;
		}

		#features .features__details:nth-child(4) .mdl-cell:last-child {
			border-bottom: none;
			padding-top: 8px;
		}
	}

	@media (min-width: 840px) {
		#features {
			width: calc(54% - 16px);
			margin-left: calc(4% + 8px);
		}

		.features__details {
			padding-left: 0;
		}
	}

	@media (min-width: 1400px) {
		#features {
			margin-left: calc(8.33333333% + 8px);
			width: calc(50% - 16px);
		}
	}
</style>
@endpush

@section('content')
<div class="mdl-grid">
	<div id="features" class="mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-cell--6-col-desktop mdl-cell--1-offset-desktop">
		<h1 id="features__heading" 
			class="mdl-typography--display-2">Painless learner logbook recordings.</h1>

		<button id="features__downloadButton" 
		   class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
			<img id="features__downloadButton__appleLogo" 
				 src="{{ asset('svg/apple-logo.svg') }}" 
				 alt="Apple Logo">
			
			<span id="features__downloadButton__text">
				Download on the <span style="font-weight: bold; padding-left: 2px;">App Store</span>
			<span>
		</button>

		<div class="mdl-grid features__details">
			<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-cell--4-col-desktop">
				<img src="{{ asset('svg/chart.svg') }}" 
					 alt="Bar Chart">

				<p>Some content here about some awesome features and what it does and why you'd like it.</p>

				<button class="mdl-cell--hide-desktop mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
					Preview
				</button>
			</div>

			<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-cell--4-col-desktop">
				<img src="{{ asset('svg/car.svg') }}" 
					 alt="Car">

				<p>Some content here about some awesome features and what it does and why you'd like it.</p>

				<button class="mdl-cell--hide-desktop mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
					Preview
				</button>
			</div>

			<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-cell--4-col-desktop">
				<img src="{{ asset('svg/supervisor.svg') }}" 
					 alt="Supervisor">

				<p>Some content here about some awesome features and what it does and why you'd like it.</p>

				<button class="mdl-cell--hide-desktop mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
					Preview
				</button>
			</div>
		</div>

		<div class="mdl-grid features__details">
			<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-cell--4-col-desktop">
				<img src="{{ asset('svg/stopwatch.svg') }}" 
					 alt="Stopwatch">

				<p>Some content here about some awesome features and what it does and why you'd like it.</p>

				<button class="mdl-cell--hide-desktop mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
					Preview
				</button>
			</div>

			<div class="mdl-cell  mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-cell--4-col-desktop">
				<img src="{{ asset('svg/log.svg') }}" 
					 alt="Log Book">

				<p>Some content here about some awesome features and what it does and why you'd like it.</p>

				<button class="mdl-cell--hide-desktop mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
					Preview
				</button>
			</div>

			<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-cell--4-col-desktop">
				<img src="{{ asset('svg/export.svg') }}" 
					 alt="Export">

				<p>Some content here about some awesome features and what it does and why you'd like it.</p>

				<button class="mdl-cell--hide-desktop mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
					Preview
				</button>
			</div>
		</div>		
	</div>

	<div class="mdl-cell mdl-cell--hide-phone mdl-cell--hide-tablet mdl-cell--5-col-desktop">
		<div id="preview__phone">
			<video id="preview__video"></video>
		</div>
	</div>
</div>
@endsection

@push('scripts')
<script>
	// var video = document.getElementById('preview__video');

	// video.src = "{{ asset('videos/dashboard-vic.mp4') }}"

	// video.addEventListener('canplay', function () {
	// 	video.play();
	// });

	// video.addEventListener('ended', function () {
	// 	console.log('next video');
	// });
</script>
@endpush
