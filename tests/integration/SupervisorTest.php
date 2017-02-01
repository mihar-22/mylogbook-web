<?php


use App\Models\Car;
use App\Models\Supervisor;
use App\Models\Trip;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class SupervisorTest extends TestCase
{
	use DatabaseMigrations;

    private $user;

    private $supervisors;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();

        $this->supervisors = factory(Supervisor::class, 3)->create(['user_id' => $this->user->id]);
    }

    /** @test */
    public function index()
    {
        factory(Supervisor::class, 3)->create([
            'user_id' => $this->user->id,
            'deleted_at' => Carbon::now()
        ]);

        $this->actingAs($this->user)
             ->getJson($this->getEndPoint());

        $this->seeJsonContains(['message' => 'collection of supervisors'])
             ->assertResponseStatus(200);

        $this->assertCount(6, json_decode($this->response->content())->data);
    }

    /** @test */
    public function store_supervisor()
    {
        $newSupervisor = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'license' => '987654321',
            'gender' => 'male'
        ];

        $this->actingAs($this->user)
             ->postJson($this->getEndPoint(), $newSupervisor);

        $this->seeJsonContains(['message' => 'supervisor created', 'data' => ['id' => Supervisor::find(4)->id]])
             ->assertResponseStatus(201);

        $this->seeInDatabase('supervisors', array_merge($newSupervisor, ['user_id' => $this->user->id]));
    }

    /** @test */
    public function store_supervisor_without_authentication()
    {
        $this->postJson($this->getEndPoint());

        $this->seeUnauthenticatedResponse();
    }

    /** @test */
    public function update_supervisor()
    {
        $update = [
            'id' => $this->supervisors[0]->id, 
            'first_name' => 'Jessie',
            'last_name' => 'Loe',
            'license' => '123456789',
            'gender' => 'female'
        ];

        $this->actingAs($this->user)
             ->putJson($this->getEndPoint($update['id']), $update);

        $this->seeJsonContains(['message' => 'supervisor updated'])
             ->assertResponseStatus(200);

        $this->seeInDatabase('supervisors', $update);
    }

    /** @test */
    public function update_supervisor_without_authentication()
    {
        $id = $this->supervisors[0]->id;

        $this->putJson($this->getEndPoint($id));

        $this->seeUnauthenticatedResponse();
    }

    /** @test */
    public function update_supervisor_without_authorization()
    {
        $unownedSupervisorId = $this->createUserAndSupervisorsForUser()[0]->id;

        $this->actingAs($this->user)
             ->putJson($this->getEndPoint($unownedSupervisorId));

        $this->seeUnauthorizedResponse();        
    }

    /** @test */
    public function delete_supervisor()
    {
        $id = $this->supervisors[0]->id;

        $this->actingAs($this->user)
             ->deleteJson($this->getEndPoint($id));

        $this->seeJsonContains(['message' => 'supervisor deleted'])
             ->assertResponseStatus(200);

        $this->seeInDatabase('supervisors', ['id' => $id, 'deleted_at' => Carbon::now()]); 
    }

    /** @test */
    public function delete_supervisor_without_authentication()
    {
        $id = $this->supervisors[0]->id;

        $this->deleteJson($this->getEndPoint($id));

        $this->seeUnauthenticatedResponse();
    }

    /** @test */
    public function delete_supervisor_without_authorization()
    {
        $unownedSupervisorId = $this->createUserAndSupervisorsForUser()[0]->id;

        $this->actingAs($this->user)
             ->deleteJson($this->getEndPoint($unownedSupervisorId));

        $this->seeUnauthorizedResponse();

        $this->seeInDatabase('supervisors', ['id' => $unownedSupervisorId]);
    }

    private function createUserAndSupervisorsForUser()
    {
        $user = factory(User::class)->create();

        return factory(Supervisor::class, 3)->create(['user_id' => $user->id]);
    }

    private function getEndPoint($id = '')
    {
        return "api/v1/supervisors/{$id}";
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