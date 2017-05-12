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

      <style>
        html, body {
          margin: 0;
          height: 100%;
          font-family: 'Roboto', sans-serif;
        }

        .Maintenance {
          display: flex;
          height: 100%;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .Maintenance_image {
          max-width: 500px;
        }

        .Maintenance_heading {
          font-size: 34px;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 40px;
          color: rgba(0, 0, 0, 0.87) !important;
          margin-top: 48px;
          margin-bottom: 0;
          text-align: center;
        }

        .Maintenance_subtitle {
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 32px;
          color: rgba(0, 0, 0, 0.64) !important;
          text-align: center;
        }
      </style>
    </head>

    <body>
      <div class="Maintenance">
        <img class="Maintenance_image" src="{{ asset('svg/503.svg') }}" alt="Service Unavailable">

        <h1 class="Maintenance_heading">Service Unavailable</h1>

        <p class="Maintenance_subtitle">We've encountered a problem, we are working hard to fix it!</p>
      </div>
    </body>
</html>


