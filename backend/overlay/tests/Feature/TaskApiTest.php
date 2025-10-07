<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_a_task()
    {
        $payload = ['title' => 'Buy books', 'description' => 'For school'];

        $res = $this->postJson('/api/tasks', $payload)
            ->assertCreated()
            ->json();

        $this->assertEquals('Buy books', $res['title']);
        $this->assertDatabaseHas('tasks', ['title' => 'Buy books', 'is_completed' => 0]);
    }

    /** @test */
    public function it_lists_only_latest_5_and_not_completed()
    {
        Task::factory()->count(6)->create(); // will create, not completed
        Task::factory()->create(['is_completed' => true]);

        $res = $this->getJson('/api/tasks')->assertOk()->json();
        $this->assertCount(5, $res);

        // ensure none are completed
        foreach ($res as $t) {
            $this->assertFalse((bool)$t['is_completed']);
        }
    }

    /** @test */
    public function it_marks_task_as_completed_and_hides_from_list()
    {
        $task = Task::create(['title' => 'X', 'description' => 'Y']);

        $this->patchJson("/api/tasks/{$task->id}/complete")->assertNoContent();

        $this->getJson('/api/tasks')->assertOk()->assertJsonMissing(['id' => $task->id]);
        $this->assertDatabaseHas('tasks', ['id' => $task->id, 'is_completed' => 1]);
    }
}
