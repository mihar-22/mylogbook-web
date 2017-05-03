@extends('master')

@section('content')
  <password-reset-view>
    <input type="hidden" name="_email" value="{{ $email }}">

    <input type="hidden" name="token" value="{{ $token }}">
  </password-reset-view>
@endsection
