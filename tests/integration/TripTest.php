<?php

namespace Tests\Integration;

use App\Models\Car;
use App\Models\Supervisor;
use App\Models\Trip;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

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

        $response = $this->makeJsonRequest('GET');

        $response->assertJson(['message' => 'collection of trips'])
                 ->assertStatus(200);

        $this->assertCount($noOfTrips, json_decode($response->content())->data);
    }

    /** @test */
    public function index_empty()
    {
        $response = $this->makeJsonRequest('GET');

        $response->assertJson(['message' => 'empty collection'])
                 ->assertStatus(200);
    }

    /** @test */
    public function store()
    {
        $newTrip = $this->makeTrip()->toArray();

        $response = $this->makeJsonRequest('POST', null, $newTrip);

        $response->assertJson(['message' => 'trip created', 'data' => ['id' => 1]])
                 ->assertStatus(201);

        $this->assertDatabaseHas('trips', $newTrip);
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

        $response = $this->makeJsonRequest('GET', $since);

        $response->assertJson(['message' => 'collection of trips'])
                 ->assertStatus(200);

        $this->assertCount($noOfTripsSince, json_decode($response->content())->data);
    }

    /** @test */
    public function transactions_empty()
    {
        $since = Carbon::now();
    
        $response = $this->makeJsonRequest('GET', $since);

        $response->assertJson(['message' => 'empty collection', 'data' => []])
                 ->assertStatus(200);
    }

    private function makeJsonRequest($method, $ext = '', $params = [])
    {
        $endPoint = "api/v1/trips/{$ext}";

        return $this->actingAs($this->user)->json($method, $endPoint, $params);
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