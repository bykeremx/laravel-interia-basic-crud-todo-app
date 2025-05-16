<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(){
        $data = [
            'title' => 'Categories',
            'categories' => Category::where("user_id", Auth::user()->id)->orderBy("created_at", "desc")->get(),
        ];
        return Inertia::render("category/CategoryPage", $data);
    }
    //
    public function create(){
        return Inertia::render("category/CreateCategory");
    }
    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'nullable|string|max:7',
            'description' => 'nullable|string|max:1000',
        ]);
        // dd($request->all());

        Category::create([
            'user_id' => Auth::user()->id,
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'color' => $request->color ?? '#3b82f6', // Default color
            'description' => $request->description,
        ]);

        return redirect()->route('category.pages')->with('success', 'Category created successfully.');
    }
    //delete
    public function destroy($id){
        $category = Category::findOrFail($id);
        if ($category->user_id !== Auth::user()->id) {
            return redirect()->route('category.pages')->with('error', 'You do not have permission to delete this category.');
        }
        $category->delete();
        return redirect()->route('category.pages')->with('success', 'Category deleted successfully.');
    }
}
