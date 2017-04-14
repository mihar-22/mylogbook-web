<?php

namespace Tests\Integration;

use App\Models\Car;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class CarTest extends TestCase
{
	use DatabaseMigrations;

    private $user;

    private $relation;

    private $table = 'cars';

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();

        $this->relation = ['user_id' => $this->user->id];
    }

    /** @test */
    public function index()
    {
        $nofOfCars = 3;

        $this->createCars($nofOfCars);

        $this->createCars($nofOfCars, ['deleted_at' => Carbon::now()]);

        $response = $this->makeJsonRequest('GET');

        $response->assertJson(['message' => 'collection of cars'])
                 ->assertStatus(200);

        $this->assertCount(($nofOfCars * 2), json_decode($response->content())->data);
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
        $newCar = $this->makeCar()->toArray();

        $response = $this->makeJsonRequest('POST', null, $newCar);

        $response->assertJson(['message' => 'car created', 'data' => ['id' => 1]])
                 ->assertStatus(201);

        $this->assertDatabaseHas($this->table, $newCar);
    }

    /** @test */
    public function update()
    {
        $id = $this->createCars(1)[0]->id;

        $update = $this->makeCar()->toArray();

        $update['id'] = $id;

        $response = $this->makeJsonRequest('PUT', $id, $update);
        
        $response->assertJson(['message' => 'car updated'])
                 ->assertStatus(200);

        $this->assertDatabaseHas($this->table, $update);
    }

    /** @test */
    public function destroy()
    {
        $id = $this->createCars(1)[0]->id;

        $response = $this->makeJsonRequest('DELETE', $id);

        $response->assertJson(['message' => 'car deleted'])
                 ->assertStatus(200);

        $this->assertDatabaseHas($this->table, ['id' => $id, 'deleted_at' => Carbon::now()]);    
    }

    /** @test */
    public function transactions()
    {    
        $this->createCars(3);

        $since = Carbon::now()->addHours(5);

        $noOfTripsSince = 5;

        $this->createCars($noOfTripsSince, ['updated_at' => Carbon::now()->addDays(1)]);

        $response = $this->makeJsonRequest('GET', $since);

        $response->assertJson(['message' => 'collection of cars'])
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

    private function makeCar()
    {
        return factory(Car::class)->make($this->relation);
    }

    private function createCars($amount, $attributes= [])
    {
        $attributes = array_merge($this->relation, $attributes);
        
        return factory(Car::class, $amount)->create($attributes);
    }

    private function makeJsonRequest($method, $id = '', $params = [])
    {
        $endPoint = "api/v1/cars/{$id}";

        return $this->actingAs($this->user)->json($method, $endPoint, $params);
    }
}