<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Todos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TodosController extends Controller
{
    public function index()
    {
        $data = [
            'title' => 'Todos',
            'todos' => Todos::with('category')
                ->where("user_id", Auth::user()->id)
                ->whereNot("status", Todos::STATUS_ARCHIVED) // "archived" dışındakiler
                ->orderBy("created_at", "desc")
                ->get(),
        ];
        // dd(Todos::where("user_id",Auth::user()->id)->first()->category->name);
        return Inertia::render("todos/TodosPage", $data);
    }
    //create to do page
    public function create()
    {
        $data = [
            'getCategory' => Category::where("user_id", Auth::user()->id)->orderBy("created_at", "desc")->get(),
        ];
        return Inertia::render('todos/CreateTodos', $data);
    }
    //stored
    public function store(Request $request)
    {
        try {
            // Verilerin doğrulama işlemi
            $validatedData = $request->validate([
                'title' => 'required|max:250',
                'description' => 'nullable|string|max:500',  // description için örnek ekledim
                'priority' => 'required|in:low,medium,high',  // priority için örnek
                'enddate' => 'nullable|date',  // enddate için örnek,
                'category' => 'required'
            ]);

            // Veriyi veritabanına kaydetme
            $todo = Todos::create([
                'user_id' => Auth::user()->id,
                'title' => $validatedData['title'],
                'description' => $validatedData['description'] ?? null,
                'priority' => $validatedData['priority'],
                'enddate' => $validatedData['enddate'] ?? null,
                'category_id' => $validatedData['category'],
            ]);

            if (!$todo) {
                return redirect()->route("create.todo.page")->with("error", "An error occurred while creating the todo.");
            }
            return redirect()->route("create.todo.page")->with("success", "Todo successfully created");
        } catch (\Throwable $th) {
            // Hata durumunda
            return response()->json([
                'message' => 'An error occurred while creating the todo.',
                'error' => $th->getMessage()
            ], 500);  // HTTP 500 Internal Server Error
        }
    }

    //delete todos
    public function destroy($id)
    {
        $todo = Todos::find($id);
        if (!$todo) {
            return redirect()->route("todos.pages")->with("error", "Todo not found.");
        }

        // Silme işlemi
        $todo->delete();

        return redirect()->route("todos.pages")->with("success", "Todo successfully deleted.");
    }
    //tamamlandı
    public function completed($id)
    {
        $todo = Todos::find($id);
        if (!$todo) {
            return redirect()->route("todos.pages")->with("error", "Todo not found.");
        }

        // Todo'yu tamamlandı olarak işaretleme
        $todo->status = Todos::STATUS_COMPLETED;
        $todo->completed_at = now(); // Tamamlanma tarihini güncelle
        $todo->save();
        return redirect()->route("todos.pages")->with("success", "Todo successfully marked as completed.");
    }

    //to do update page
    public function edit($id)
    {
        $todo = Todos::with('category')->find($id);
        if (!$todo) {
            return redirect()->route("todos.pages")->with("error", "Todo not found.");
        }

        $data = [
            'todo' => $todo,
            'getCategory' => Category::where("user_id", Auth::user()->id)->orderBy("created_at", "desc")->get(),
        ];
        return Inertia::render('todos/UpdateTodos', $data);
    }
    //update
    public function update(Request $request, $id)
    {
        $todo = Todos::find($id);
        if (!$todo) {
            return redirect()->route("todos.pages")->with("error", "Todo not found.");
        }

        // Verilerin doğrulama işlemi
        $validatedData = $request->validate([
            'title' => 'required|max:250',
            'description' => 'nullable|string|max:500',
            'priority' => 'required|in:low,medium,high',
            'enddate' => 'nullable|date',
            'category' => 'required|exists:categories,id'
        ]);
        // Todo'yu güncelleme
        $todo->update([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'] ?? null,
            'priority' => $validatedData['priority'],
            'enddate' => $validatedData['enddate'] ?? null,
            'category_id' => $validatedData['category'],
        ]);

        return redirect()->route("todos.pages")->with("success", "Todo successfully updated.");
    }
    // add arc
    public function addArchive($id)
    {
        $todo = Todos::find($id);
        if (!$todo) {
            return redirect()->route("todos.pages")->with("error", "Todo not found.");
        }

        // Todo'yu arşivle
        $todo->status = Todos::STATUS_ARCHIVED;
        $todo->save();

        return redirect()->route("todos.pages")->with("success", "Todo successfully archived.");
    }
    //archive
    public function archive()
    {
        $data = [
            'title' => 'Archive',
            'todos' => Todos::with('category')
                ->where("user_id", Auth::user()->id)
                ->where("status", Todos::STATUS_ARCHIVED)
                ->orderBy("created_at", "desc")
                ->get(),
        ];
        return Inertia::render("todos/ArchiveTodos", $data);
    }
    //remove archive
    public function removeArchive($id)
    {
        $todo = Todos::find($id);
        if (!$todo) {
            return redirect()->route("todos.archive.page")->with("error", "Todo not found.");
        }

        // Arşivden çıkarma işlemi
        $todo->status = Todos::STATUS_PENDING; // veya istediğiniz başka bir durum
        $todo->save();

        return redirect()->route("todos.archive.page")->with("success", "Todo successfully removed from archive.");
    }
}
