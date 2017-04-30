<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">

        <title>Mylogbook</title>

        <meta name="description" content="Mylogbook is a simple way for you to record, manage and organise the data for your learner logbook and view your progress towards your P's (provisional licence).">

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="/manifest.json">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0cbf34">
        <meta name="theme-color" content="#ffffff">

        <link rel="stylesheet" href="{{ asset('libraries/material/material.min.css') }}">

        <style>
            /*
            * ------------------------------------
            * Foundation 
            * ------------------------------------
            */

            html, body {
                font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                font-size: 16px;
                background-color: #fafafa;
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

            form {
                margin-top: -32px;
            }

            /*
            * ------------------------------------
            * Layout
            * ------------------------------------
            */

            .mlb-header {
                display: block;
                width: 100%;
                padding: 16px 0;
                text-align: center;
                background-color: #fff;
                border-bottom: 1px solid rgba(99, 114, 130, 0.15);
                box-shadow: 0 2px 6px -2px rgba(99, 114, 130, 0.15);
            }

            .mlb-header-logo {
                width: 80%;
                max-width: 380px;
            }

            .mlb-typography--strong {
                font-weight: 600;
                color: #000;
            }

            .mlb-typography--subheading {
                font-size: 20px; 
                font-weight: 300;
                line-height: 32px;
            }

            /*
            * ------------------------------------
            * Material Design Lite
            * ------------------------------------
            */

            .mdl-typography--display-2 {
                text-align: center;
                margin-bottom: 32px;
            }

            .mdl-textfield {
                width: 100%;
                margin-top: 8px;
            }

            .mdl-button[type="submit"] {
                width: 100%;
                margin-top: 16px;
            }

            .mdl-layout__content {
                display: flex; 
                display: -webkit-flex;
                flex-direction: column;
                -webkit-flex-direction: column;
            }

            .mdl-mini-footer {
                display: block;
                padding: 12px 24px;
            }

            .mdl-mini-footer__link-list {
                justify-content: flex-end;
            }

            .mdl-mini-footer__link-list > li {
                padding: 0 12px;
                margin: 0;
                font-size: 12px;
                color: #fff;
            }

            @media (max-width: 480px) {
                .mdl-mini-footer__link-list {
                    justify-content: center;
                }
            }
        </style>

        @stack('styles')
    </head>

    <body id="app">
        <div class="mdl-layout mdl-js-layout">
            <!-- Header -->
            <header class="mlb-header">
                <a href="{{ url('') }}">
                    <!-- Logo -->
                    <img class="mlb-header-logo" 
                         src="{{ asset('svg/logo.svg') }}" 
                         alt="Mylogbook Logo">                                            
                </a>  
            </header>

            <div class="mdl-layout-spacer"></div>
            
            <!-- Content -->
            <main class="mdl-layout__content">
                <div class="page-content">
                    @yield('content')
                </div>      

                <div class="mdl-layout-spacer"></div>

                <!-- Footer -->
                <footer class="mdl-mini-footer">
                    <ul class="mdl-mini-footer__link-list">
                        <li><a href="{{ url('/contact-us') }}">Contact Us</a></li>
                        <li><a href="{{ url('/legal/privacy-policy') }}">Privacy Policy</a></li>
                        <li><a href="{{ url('/legal/terms-of-service') }}">Terms of Service</a></li>
                    </ul>
                </footer>
            </main>
        </div>
    </body>

    <script defer src="{{ asset('libraries/material/material.min.js') }}"></script>
    @stack('scripts')
</html>
