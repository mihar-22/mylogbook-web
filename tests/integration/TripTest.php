<?php

use App\Models\Car;
use App\Models\Supervisor;
use App\Models\Trip;
use App\Models\User;
use Carbon\Carbon;
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
    public function index()
    {
        factory(Trip::class, 3)->create([
            'user_id' => $this->user->id,
            'car_id' => $this->car->id,
            'supervisor_id' => $this->supervisor->id
        ]);

        $this->actingAs($this->user)
             ->getJson($this->getEndPoint());

        $this->seeJsonContains(['message' => 'collection of trips'])
             ->assertResponseStatus(200);

        $this->assertCount(3, json_decode($this->response->content())->data);
    }

    /** @test */
    public function store_trip()
    {
        $newTrip = [
            'start' => Carbon::now()->format('Y/m/d H:i:s'),
            'end' => Carbon::now()->addHour()->format('Y/m/d H:i:s'),
            'odometer' => 32000,
            'distance' => 15.32,
            'car_id' => $this->car->id,
            'supervisor_id' => $this->supervisor->id,
            'weather' => [
                'clear' => true,
                'rain' => false,
                'thunder' => false,
            ],
            'traffic' => [
                'light' => false,
                'moderate' => true,
                'heavy' => true,
            ],
            'roads' => [
                'local_street' => true,
                'main_road' => true,
                'inner_city' => false,
                'freeway' => true,
                'rural_highway' => true,
                'gravel' => true,
            ]
        ];

        $this->actingAs($this->user)
             ->postJson($this->getEndPoint(), $newTrip);

        $this->seeJsonContains(['message' => 'trip created'])
             ->assertResponseStatus(201);

        $this->seeInDatabase('trips', array_merge(
            Trip::flatten($newTrip), 
            ['user_id' => $this->user->id]
        ));
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