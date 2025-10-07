<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    // GET /api/tasks - latest 5, only not-completed
    public function index(Request $request)
    {
        $tasks = Task::where('is_completed', false)
            ->orderByDesc('created_at')
            ->limit(5)
            ->get();

        return response()->json($tasks);
    }

    // POST /api/tasks - create
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:10000'],
        ]);

        $task = Task::create($data);

        return response()->json($task, Response::HTTP_CREATED);
    }

    // PATCH /api/tasks/{task}/complete - mark done
    public function complete(Task $task)
    {
        if ($task->is_completed) {
            return response()->noContent(); // already done
        }

        $task->is_completed = true;
        $task->save();

        return response()->noContent(); // 204
    }
}
