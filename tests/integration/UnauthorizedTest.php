<?php

namespace Tests\Integration;

use App\Models\Car;
use App\Models\Supervisor;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

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

        $this->assertUnauthorized('PUT', $endPoint);
    }

    /** @test */
    public function delete_car_without_authorization()
    {
        $endPoint = $this->buildNotOwnedEndPoint(Car::class);

        $this->assertUnauthorized('DELETE', $endPoint);
    }

    /** @test */
    public function update_supervisor_without_authorization()
    {
        $endPoint = $this->buildNotOwnedEndPoint(Supervisor::class);

        $this->assertUnauthorized('PUT', $endPoint);
    }

    /** @test */
    public function delete_supervisor_without_authorization()
    {
        $endPoint = $this->buildNotOwnedEndPoint(Supervisor::class);

        $this->assertUnauthorized('DELETE', $endPoint);
    }

    /** @test */
    public function store_trip_with_not_owned_car()
    {
        $endPoint = $this->buildEndPoint('trips');

        $params = [
            'car_id' => $this->createNotOwnedModel(Car::class)->id,
            'supervsior_id' => $this->createOwnedModel(Supervisor::class)->id
        ];

        $this->assertUnauthorized('POST', $endPoint, $params);
    }

    /** @test */
    public function store_trip_with_not_owned_supervisor()
    {
        $endPoint = $this->buildEndPoint('trips');

        $params = [
            'car_id' => $this->createOwnedModel(Car::class)->id,
            'supervsior_id' => $this->createNotOwnedModel(Supervisor::class)->id
        ];

        $this->assertUnauthorized('POST', $endPoint, $params);
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

    private function assertUnauthorized($method, $endPoint, $params = [])
    {
        $this->expectException(AuthorizationException::class);
        
        $this->actingAs($this->user)
             ->json($method, $endPoint, $params)
             ->assertJson(['message' => 'unauthorized'])
             ->assertStatus(403);
    }
}