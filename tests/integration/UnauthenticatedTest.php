<?php

use App\Models\Car;
use App\Models\Supervisor;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class UnauthenticatedTest extends TestCase
{
	use DatabaseMigrations;

    private $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    /** @test */
    public function store_car_without_authentication()
    {
        $endPoint = $this->buildEndPoint(Car::class);

        $this->makeUnauthenticatedRequest('POST', $endPoint);
    }

    /** @test */
    public function update_car_without_authentication()
    {
        $endPoint = $this->buildEndPoint(Car::class, [], $includeIdentifier = true);

        $this->makeUnauthenticatedRequest('PUT', $endPoint);
    }

    /** @test */
    public function delete_car_without_authentication()
    {
        $endPoint = $this->buildEndPoint(Car::class, [], $includeIdentifier = true);

        $this->makeUnauthenticatedRequest('DELETE', $endPoint);
    }

    /** @test */
    public function store_supervisor_without_authentication()
    {
        $endPoint = $this->buildEndPoint(Supervisor::class);

        $this->makeUnauthenticatedRequest('POST', $endPoint);
    }

    /** @test */
    public function update_supervisor_without_authentication()
    {
        $endPoint = $this->buildEndPoint(Supervisor::class, [], true);

        $this->makeUnauthenticatedRequest('PUT', $endPoint);
    }
    
    /** @test */
    public function delete_supervisor_without_authentication()
    {
        $endPoint = $this->buildEndPoint(Supervisor::class, [], true);

        $this->makeUnauthenticatedRequest('DELETE', $endPoint);
    }

    /** @test */
    public function store_trip_without_authentication()
    {
        $attributes = [
            'car_id' => $this->createModel(Car::class)->id,
            'supervisor_id' => $this->createModel(Supervisor::class)->id
        ];

        $endPoint = $this->buildEndPoint(Trip::class, $attributes);

        $this->makeUnauthenticatedRequest('POST', $endPoint);        
    }

    private function createModel($class, $attributes = [])
    {
        return factory($class)->create(array_merge([
            'user_id' => $this->user->id], 
            $attributes
        ));
    }

    private function buildEndPoint($class, $attributes = [], $includeIdentifier = false)
    {
        $model = $this->createModel($class, $attributes);

        $resource = $model->getTable();

        $id = $includeIdentifier ? $model->id : '';

        return "api/v1/{$resource}/{$id}";
    }

    private function makeUnauthenticatedRequest($method, $endPoint, $params = [])
    {
        $this->json($method, $endPoint, $params);

        $this->seeUnauthenticatedResponse();
    }

    private function seeUnauthenticatedResponse()
    {
        $this->seeJsonContains(['message' => 'unauthenticated'])
             ->assertResponseStatus(401);
    }
}