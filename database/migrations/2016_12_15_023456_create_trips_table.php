<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTripsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trips', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('started_at');
            $table->dateTime('ended_at');
            $table->integer('odometer');
            $table->decimal('distance', 6, 2);
            
            // Weather
            $table->boolean('clear')->default(false);
            $table->boolean('rain')->default(false);
            $table->boolean('thunder')->default(false);

            // Traffic
            $table->boolean('light')->default(false);
            $table->boolean('moderate')->default(false);
            $table->boolean('heavy')->default(false);

            // Roads
            $table->boolean('local_street')->default(false);
            $table->boolean('main_road')->default(false);
            $table->boolean('inner_city')->default(false);
            $table->boolean('freeway')->default(false);
            $table->boolean('rural_highway')->default(false);
            $table->boolean('gravel')->default(false);

            // Location
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->string('timezone', 100);

            // Foreign Keys
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('car_id')->unsigned();
            $table->foreign('car_id')->references('id')->on('cars')->onDelete('cascade');

            $table->integer('supervisor_id')->unsigned();
            $table->foreign('supervisor_id')->references('id')->on('supervisors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trips');
    }
}
