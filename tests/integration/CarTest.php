<?php

use App\Models\Car;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class CarTest extends TestCase
{
	use DatabaseMigrations;

    private $user;

    private $cars;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();

        $this->cars = factory(Car::class, 3)->create(['user_id' => $this->user->id]);
    }

    /** @test */
    public function index()
    {
        $this->actingAs($this->user)
             ->getJson($this->getEndPoint());

        $this->seeJsonContains(['message' => 'collection of cars'])
             ->assertResponseStatus(200);

        $this->assertCount(3, json_decode($this->response->content())->data);
    }

    /** @test */
    public function store_car()
    {
        $newCar = [
            'regno' => 'AAA111',
            'year' => '1993',
            'make' => 'Toyota',
            'model' => 'Supra',
            'type' => 'Sports',
            'trans' => 'M',
            'odo' => 11337,            
        ];

        $this->actingAs($this->user)
             ->postJson($this->getEndPoint(), $newCar);

        $this->seeJsonContains(['message' => 'car created'])
             ->assertResponseStatus(201);

        $this->seeInDatabase('cars', array_merge($newCar, ['user_id' => $this->user->id]));
    }

    /** @test */
    public function store_car_without_authentication()
    {
        $this->postJson($this->getEndPoint());

        $this->seeUnauthenticatedResponse();
    }

    /** @test */
    public function update_car()
    {
        $update = ['id' => $this->cars[0]->id, 'regno' => 'ZXY987', 'odo' => 100];

        $this->actingAs($this->user)
             ->putJson($this->getEndPoint($update['id']), $update);

        $this->seeJsonContains(['message' => 'car updated'])
             ->assertResponseStatus(200);

        $this->seeInDatabase('cars', $update);
    }

    /** @test */
    public function update_car_without_authentication()
    {
        $id = $this->cars[0]->id;

        $this->putJson($this->getEndPoint($id));

        $this->seeUnauthenticatedResponse();
    }

    /** @test */
    public function update_car_without_authorization()
    {
        $unownedCarId = $this->createUserAndCarsForUser()[0]->id;

        $this->actingAs($this->user)
             ->putJson($this->getEndPoint($unownedCarId));

        $this->seeUnauthorizedResponse();        
    }

    /** @test */
    public function delete_car()
    {
        $id = $this->cars[0]->id;

        $this->actingAs($this->user)
             ->deleteJson($this->getEndPoint($id));

        $this->seeJsonContains(['message' => 'car deleted'])
             ->assertResponseStatus(200);

        $this->notSeeInDatabase('cars', ['id' => $id]);
    }

    /** @test */
    public function delete_car_without_authentication()
    {
        $id = $this->cars[0]->id;

        $this->deleteJson($this->getEndPoint($id));

        $this->seeUnauthenticatedResponse();
    }

    /** @test */
    public function delete_car_without_authorization()
    {
        $unownedCarId = $this->createUserAndCarsForUser()[0]->id;

        $this->actingAs($this->user)
             ->deleteJson($this->getEndPoint($unownedCarId));

        $this->seeUnauthorizedResponse();

        $this->seeInDatabase('cars', ['id' => $unownedCarId]);
    }

    private function createUserAndCarsForUser()
    {
        $user = factory(User::class)->create();

        return factory(Car::class, 3)->create(['user_id' => $user->id]);
    }

    private function getEndPoint($id = '')
    {
        return "api/v1/cars/{$id}";
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