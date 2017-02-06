<?php


use App\Models\Supervisor;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseMigrations;

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

        $this->makeJsonRequest('GET');

        $this->seeJsonContains(['message' => 'collection of supervisors'])
             ->assertResponseStatus(200);

        $this->assertCount(($nofOfSupervisors * 2), json_decode($this->response->content())->data);
    }

    /** @test */
    public function store()
    {
        $newSupervisor = $this->makeSupervisor()->toArray();

        $this->makeJsonRequest('POST', null, $newSupervisor);

        $this->seeJsonContains(['message' => 'supervisor created', 'data' => ['id' => 1]])
             ->assertResponseStatus(201);

        $this->seeInDatabase($this->table, $newSupervisor);
    }

    /** @test */
    public function update()
    {
        $id = $this->createSupervisors(1)->id;

        $update = $this->makeSupervisor()->toArray();

        $update['id'] = $id;

        $this->makeJsonRequest('PUT', $id, $update);

        $this->seeJsonContains(['message' => 'supervisor updated'])
             ->assertResponseStatus(200);

        $this->seeInDatabase($this->table, $update);
    }

    /** @test */
    public function destroy()
    {
        $id = $this->createSupervisors(1)->id;

        $this->makeJsonRequest('DELETE', $id);

        $this->seeJsonContains(['message' => 'supervisor deleted'])
             ->assertResponseStatus(200);

        $this->seeInDatabase($this->table, ['id' => $id, 'deleted_at' => Carbon::now()]); 
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

        $this->makeJsonRequest('GET', $since);

        $this->seeJsonContains(['message' => 'collection of supervisors'])
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

    private function makeJsonRequest($method, $id = '', $params = [])
    {
        $endPoint = "api/v1/supervisors/{$id}";

        $this->actingAs($this->user)->json($method, $endPoint, $params);
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