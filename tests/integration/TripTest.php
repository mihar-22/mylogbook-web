<?php

use App\Models\Car;
use App\Models\Supervisor;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class TripTest extends TestCase
{
	use DatabaseMigrations;

    private $user;

    private $car;

    private $supervisor;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();

        $this->car = factory(Car::class)->create(['user_id' => $this->user->id]);

        $this->supervisor = factory(Supervisor::class)->create(['user_id' => $this->user->id]);
    }

    /** @test */
    public function store_trip()
    {
        $newTrip = [
            'start' => '2016/12/15 16:05:00',
            'end' => '2016/12/15 18:21:00',
            'odometer' => 32000,     
            'distance' => 15.32,

            // Light
            'day' => true,
            'afternoon' => false,
            'night' => false,

            // Weather
            'clear' => true,
            'rain' => false,
            'thunder' => false,

            // Traffic
            'light' => false,
            'moderate' => true,
            'heavy' => true,

            // Roads
            'local_street' => true,
            'main_road' => true,
            'inner_city' => false,
            'freeway' => true,
            'rural_highway' => true,
            'gravel' => true,

            // Resources
            'car_id' => $this->car->id,
            'supervisor_id' => $this->supervisor->id
        ];

        $this->actingAs($this->user)
             ->postJson($this->getEndPoint(), $newTrip);

        $this->seeJsonContains(['message' => 'trip created'])
             ->assertResponseStatus(201);

        $this->seeInDatabase('trips', array_merge($newTrip, ['user_id' => $this->user->id]));
    }

    /** @test */
    public function store_trip_without_authentication()
    {
        $this->postJson($this->getEndPoint());

        $this->seeUnauthenticatedResponse();
    }

    /** @test */
    public function store_trip_without_car_authorization()
    {
        $unownedCar = $this->createUserAndCarForUser();

        $this->actingAs($this->user)
             ->postJson($this->getEndPoint(), [
                'car_id' => $unownedCar->id,
                'supervisor_id' => $this->supervisor->id
             ]);

        $this->seeUnauthorizedResponse();
    }

    /** @test */
    public function store_trip_without_supervisor_authorization()
    {
        $unownedSupervisor = $this->createUserAndSupervisorForUser();

        $this->actingAs($this->user)
             ->postJson($this->getEndPoint(), [
                'car_id' => $this->car->id,
                'supervisor_id' => $unownedSupervisor->id
             ]);

        $this->seeUnauthorizedResponse();
    }

    private function getEndPoint()
    {
        return 'api/v1/trips';
    }

    private function createUserAndCarForUser()
    {
        $user = factory(User::class)->create();

        return factory(Car::class)->create(['user_id' => $user->id]);
    }

    private function createUserAndSupervisorForUser()
    {
        $user = factory(User::class)->create();

        return factory(Supervisor::class)->create(['user_id' => $user->id]);
    }

    private function seeUnauthenticatedResponse()
    {
        $this->seeJsonContains(['message' => 'unauthenticated'])
             ->assertResponseStatus(401);
    }

    private function seeUnauthorizedResponse()
    {
        $this->seeJsonContains(['message' => 'unauthorized'])
             ->assertResponseStatus(403);        
    }
}