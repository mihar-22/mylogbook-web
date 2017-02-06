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

    private $relations;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();

        $userRelation = ['user_id' => $this->user->id];

        $car = factory(Car::class)->create($userRelation);

        $supervisor = factory(Supervisor::class)->create($userRelation);

        $this->relations = [
            'user_id' => $this->user->id,
            'car_id' => $car->id,
            'supervisor_id' => $supervisor->id
        ];
    }

    /** @test */
    public function index()
    {
        $noOfTrips = 3;

        $this->createTrips($noOfTrips);

        $this->makeJsonRequest('GET');

        $this->seeJsonContains(['message' => 'collection of trips'])
             ->assertResponseStatus(200);

        $this->assertCount($noOfTrips, json_decode($this->response->content())->data);
    }

    /** @test */
    public function index_empty()
    {
        $this->makeJsonRequest('GET');

        $this->seeJsonContains(['message' => 'empty collection'])
             ->assertResponseStatus(200);
    }

    /** @test */
    public function store()
    {
        $newTrip = $this->makeTrip()->toArray();

        $this->makeJsonRequest('POST', null, $newTrip);

        $this->seeJsonContains(['message' => 'trip created'])
             ->assertResponseStatus(201);

        $this->seeInDatabase('trips', Trip::flatten($newTrip));
    }

    /** @test */
    public function transactions()
    {    
        $this->createTrips(3);

        $since = Carbon::now()->addHours(5);

        $noOfTripsSince = 5;

        $this->createTrips($noOfTripsSince, [
            'started_at' => Carbon::now()->addDays(1),
            'ended_at' => Carbon::now()->addDays(1)->addHours(1)
        ]);

        $this->makeJsonRequest('GET', $since);

        $this->seeJsonContains(['message' => 'collection of trips'])
             ->assertResponseStatus(200);

        $this->assertCount($noOfTripsSince, json_decode($this->response->content())->data);
    }

    /** @test */
    public function transactions_returns_no_conflict()
    {
        $since = Carbon::now();
    
        $this->makeJsonRequest('GET', $since);

        $this->assertResponseStatus(304);
    }

    private function makeJsonRequest($method, $ext = '', $params = [])
    {
        $endPoint = "api/v1/trips/{$ext}";

        $this->actingAs($this->user)->json($method, $endPoint, $params);
    }

    private function makeTrip()
    {
        return factory(Trip::class)->make($this->relations);
    }

    private function createTrips($amount, $attributes = [])
    {
        return factory(Trip::class, $amount)->create(array_merge($this->relations, $attributes));
    }
}