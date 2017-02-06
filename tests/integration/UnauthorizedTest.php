<?php

use App\Models\Car;
use App\Models\Supervisor;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class UnauthorizedTest extends TestCase
{
	use DatabaseMigrations;

    private $user;

    private $userTwo;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();

        $this->userTwo = factory(User::class)->create();
    }

    /** @test */
    public function update_car_without_authorization()
    {
        $endPoint = $this->buildNotOwnedEndPoint(Car::class);

        $this->makeUnauthorizedRequest('PUT', $endPoint);
    }

    /** @test */
    public function delete_car_without_authorization()
    {
        $endPoint = $this->buildNotOwnedEndPoint(Car::class);

        $this->makeUnauthorizedRequest('DELETE', $endPoint);
    }

    /** @test */
    public function update_supervisor_without_authorization()
    {
        $endPoint = $this->buildNotOwnedEndPoint(Supervisor::class);

        $this->makeUnauthorizedRequest('PUT', $endPoint);
    }

    /** @test */
    public function delete_supervisor_without_authorization()
    {
        $endPoint = $this->buildNotOwnedEndPoint(Supervisor::class);

        $this->makeUnauthorizedRequest('DELETE', $endPoint);
    }

    /** @test */
    public function store_trip_with_not_owned_car()
    {
        $endPoint = $this->buildEndPoint('trips');

        $params = [
            'car_id' => $this->createNotOwnedModel(Car::class)->id,
            'supervsior_id' => $this->createOwnedModel(Supervisor::class)->id
        ];

        $this->makeUnauthorizedRequest('POST', $endPoint, $params);
    }

    /** @test */
    public function store_trip_with_not_owned_supervisor()
    {
        $endPoint = $this->buildEndPoint('trips');

        $params = [
            'car_id' => $this->createOwnedModel(Car::class)->id,
            'supervsior_id' => $this->createNotOwnedModel(Supervisor::class)->id
        ];

        $this->makeUnauthorizedRequest('POST', $endPoint, $params);
    }

    private function createOwnedModel($class)
    {
        return factory($class)->create(['user_id' => $this->user->id]);
    }

    private function createNotOwnedModel($class)
    {
        return factory($class)->create(['user_id' => $this->userTwo->id]);
    }

    private function buildNotOwnedEndPoint($class)
    {
        $notOwnedModel = $this->createNotOwnedModel($class);

        return $this->buildEndPoint($notOwnedModel->getTable(), $notOwnedModel->id);
    }

    private function buildEndPoint($resource, $id = '')
    {
        return "api/v1/{$resource}/{$id}";
    }

    private function makeUnauthorizedRequest($method, $endPoint, $params = [])
    {
        $this->actingAs($this->user)->json($method, $endPoint, $params);        

        $this->seeUnauthorizedResponse();
    }

    private function seeUnauthorizedResponse()
    {
        $this->seeJsonContains(['message' => 'unauthorized'])
             ->assertResponseStatus(403);        
    }
}