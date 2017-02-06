<?php

use App\Models\Car;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseMigrations;

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

        $this->makeJsonRequest('GET');

        $this->seeJsonContains(['message' => 'collection of cars'])
             ->assertResponseStatus(200);

        $this->assertCount(($nofOfCars * 2), json_decode($this->response->content())->data);
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
        $newCar = $this->makeCar()->toArray();

        $this->makeJsonRequest('POST', null, $newCar);

        $this->seeJsonContains(['message' => 'car created', 'data' => ['id' => 1]])
             ->assertResponseStatus(201);

        $this->seeInDatabase($this->table, $newCar);
    }

    /** @test */
    public function update()
    {
        $id = $this->createCars(1)->id;

        $update = $this->makeCar()->toArray();

        $update['id'] = $id;

        $this->makeJsonRequest('PUT', $id, $update);

        $this->seeJsonContains(['message' => 'car updated'])
             ->assertResponseStatus(200);

        $this->seeInDatabase($this->table, $update);
    }

    /** @test */
    public function destroy()
    {
        $id = $this->createCars(1)->id;

        $this->makeJsonRequest('DELETE', $id);

        $this->seeJsonContains(['message' => 'car deleted'])
             ->assertResponseStatus(200);

        $this->seeInDatabase($this->table, ['id' => $id, 'deleted_at' => Carbon::now()]);    
    }

    /** @test */
    public function transactions()
    {    
        $this->createCars(3);

        $since = Carbon::now()->addHours(5);

        $noOfTripsSince = 5;

        $this->createCars($noOfTripsSince, ['updated_at' => Carbon::now()->addDays(1)]);

        $this->makeJsonRequest('GET', $since);

        $this->seeJsonContains(['message' => 'collection of cars'])
             ->assertResponseStatus(200);

        $this->assertCount($noOfTripsSince, json_decode($this->response->content())->data);
    }

    /** @test */
    public function transactions_empty()
    {
        $since = Carbon::now();
    
        $this->makeJsonRequest('GET', $since);

        $this->seeJsonContains(['message' => 'empty collection', 'data' => []])
             ->assertResponseStatus(200);
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

        $this->actingAs($this->user)->json($method, $endPoint, $params);
    }
}