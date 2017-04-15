<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">

        <title>Mylogbook</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="/manifest.json">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0cbf34">
        <meta name="theme-color" content="#ffffff">

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.teal-red.min.css">

        <style>
            .mlb-typography--strong {
                font-weight: 600;
                color: #000;
            }

            body {
                font-size: 16px;
            }

            ul, ol {
                font-size: 16px;
            }

            li {
                padding-bottom: 8px;
            }

            p {
                font-size: 16px;
            }
        </style>
    </head>

    <body>
        <div class="mdl-layout mdl-js-layout">
            <!-- Header -->
            <header class="mdl-cell mdl-cell--3-col-phone mdl-cell--4-col-tablet">
                <a href="{{ url('') }}">
                    <!-- Logo -->
                    <img src="{{ asset('svg/logo.svg') }}" 
                         alt="Mylogbook Logo">                                            
                </a>
            </header>

            <div class="mdl-layout-spacer"></div>
            
            <!-- Content -->
            <main class="mdl-layout__content">
                <div class="page-content">
                    @yield('content')
                </div>      
            </main>

            <div class="mdl-layout-spacer"></div>

            <!-- Footer -->
            <footer class="mdl-mini-footer">
                <div class="mdl-mini-footer__left-section">
                    <ul class="mdl-mini-footer__link-list">
                        <li><a href="{{ url('/legal/privacy-policy') }}">Privacy Policy</a></li>
                        <li><a href="{{ url('/legal/terms-of-service') }}">Terms of Service</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    </body>

    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>    
</html>
