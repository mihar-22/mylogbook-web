<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">

      <title>Mylogbook</title>

      <meta name="description" content="Mylogbook is a simple mobile app for you to record, manage and organise the data for your learner logbook and view your progress towards your P's (provisional licence).">

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
      <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
      <link rel="manifest" href="/manifest.json">
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0cbf34">
      <meta name="theme-color" content="#ffffff">

      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700">

      @if (App::environment('local', 'testing'))
        <link rel="stylesheet" href="http://localhost:8080/assets/app.css">
      @else
        <link rel="stylesheet" href="{{ asset('dist/app.css') }}">
      @endif
    </head>

    <body>
      <div id="app"></div>

      <script>
        window.Laravel = {!! json_encode([
          'csrfToken' => csrf_token(),
        ]) !!};
      </script>

      <script src="{{ asset('dist/bootstrap.js') }}"></script>

      @if (App::environment('local', 'testing'))
        <script src="http://localhost:8080/assets/app.js"></script>
      @else
        <script src="{{ asset('dist/app.js') }}"></script>

        <script src="//www.googleadservices.com/pagead/conversion_async.js"></script>
      @endif
    </body>
</html>
