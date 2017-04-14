<?php

namespace Tests\Integration;

use App\Models\Supervisor;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class SupervisorTest extends TestCase
{
	use DatabaseMigrations;

    private $user;

    private $relation;

    private $table = 'supervisors';

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();

        $this->relation = ['user_id' => $this->user->id];
    }

    /** @test */
    public function index()
    {
        $nofOfSupervisors = 3;

        $this->createSupervisors($nofOfSupervisors);

        $this->createSupervisors($nofOfSupervisors, ['deleted_at' => Carbon::now()]);

        $response = $this->makeJsonRequest('GET');

        $response->assertJson(['message' => 'collection of supervisors'])
                 ->assertStatus(200);

        $this->assertCount(($nofOfSupervisors * 2), json_decode($response->content())->data);
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
        $newSupervisor = $this->makeSupervisor()->toArray();

        $response = $this->makeJsonRequest('POST', null, $newSupervisor);

        $response->assertJson(['message' => 'supervisor created', 'data' => ['id' => 1]])
                 ->assertStatus(201);

        $this->assertDatabaseHas($this->table, $newSupervisor);
    }

    /** @test */
    public function update()
    {
        $id = $this->createSupervisors(1)[0]->id;

        $update = $this->makeSupervisor()->toArray();

        $update['id'] = $id;

        $response = $this->makeJsonRequest('PUT', $id, $update);

        $response->assertJson(['message' => 'supervisor updated'])
                 ->assertStatus(200);

        $this->assertDatabaseHas($this->table, $update);
    }

    /** @test */
    public function destroy()
    {
        $id = $this->createSupervisors(1)[0]->id;

        $response = $this->makeJsonRequest('DELETE', $id);

        $response->assertJson(['message' => 'supervisor deleted'])
                 ->assertStatus(200);

        $this->assertDatabaseHas($this->table, ['id' => $id, 'deleted_at' => Carbon::now()]); 
    }

    /** @test */
    public function transactions()
    {    
        $this->createSupervisors(3);

        $since = Carbon::now()->addHours(5);

        $noOfTripsSince = 5;

        $this->createSupervisors($noOfTripsSince, [
            'updated_at' => Carbon::now()->addDays(1)
        ]);

        $response = $this->makeJsonRequest('GET', $since);

        $response->assertJson(['message' => 'collection of supervisors'])
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

    private function makeJsonRequest($method, $id = '', $params = [])
    {
        $endPoint = "api/v1/supervisors/{$id}";

        return $this->actingAs($this->user)->json($method, $endPoint, $params);
    }

    private function makeSupervisor()
    {
        return factory(Supervisor::class)->make($this->relation);
    }

    private function createSupervisors($amount, $attributes= [])
    {
        $attributes = array_merge($this->relation, $attributes);
        
        return factory(Supervisor::class, $amount)->create($attributes);
    }
}