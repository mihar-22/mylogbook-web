# Mylogbook

Mylogbook allows Australian learner drivers to record and organise their logbook digitally. The application aims to make the process less painful in comparison to the paper system by:

* Storing and personalising reusable data such as supervisors and cars.
* Calculating missing information when logging such as the time taken and odometer readings.
* Automatically tracking conditions such as the route and weather.
* Providing a simple dashboard for keeping track of progression towards probationary licence.
* Keeping data safe by storing it safely in the cloud and maintaining backups.
* Reducing cheating by recording the trip with the phones GPS and requiring digital supervisor approval.
* Up-to-date notifications on best practices and changes to road rules and safety or the learner system.

This is **not for public release** and it's used **only for prototyping and testing** the idea. This is not the codebase that will be used for production.

## Quickstart

This repository includes the frontend web app built with [Vue](https://vuejs.org/) and the backend [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) [API](https://en.wikipedia.org/wiki/Application_programming_interface) which is built with [Laravel](https://laravel.com/). To get started first check out the [Laravel Installation](https://laravel.com/docs/5.6/installation) guide. Don't forget to create a **.env** file after cloning the repository.

From the command line, clone the repository and cd into it

    git clone git@github.com:mihar-22/mylogbook-web.git Mylogbook && cd $_

Install [Composer](https://getcomposer.org/) on your machine and run

	composer install

Install [Yarn](https://yarnpkg.com/lang/en/) on your machine and run

	yarn install

Install [NPM](https://www.npmjs.com/) on your machine and run

	npm run build-dev
	npm run serve

Serve the project with [Valet](https://laravel.com/docs/5.6/valet), [Homestead](https://laravel.com/docs/5.6/homestead) or run

	php artisan serve
