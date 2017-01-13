<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">

        <title>Mylogbook</title>

        <link href="https://fonts.googleapis.com/css?family=Raleway:100" rel="stylesheet">

        <style>
            html, body {
                height: 100vh;
                margin: 0;
            }

            .mlb-container {
                position: relative;
                height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #636b6f;
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
            }

            .mlb-title {
                flex: 1;
                display: flex;
                align-items: center;
                font-size: 84px;
            }

            .mlb-center {
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            /* Bootstrap Customizations */

            .container-fluid {
                flex: 1;
            }

            .btn {
                padding: 16px 16px !important;
                border-radius: 0px !important;
            }

            /* Media Queries */

            @media (max-width: 600px) {
                .mlb-title {
                    font-size: 48px;
                }
            }
        </style>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    </head>

    <body>
        @yield('content')
    </body>
</html>
