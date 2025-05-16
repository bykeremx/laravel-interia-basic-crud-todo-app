<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TodosController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    //todos page
    Route::get("/todos", [TodosController::class, "index"])->name("todos.pages");
    //create todo page
    Route::get("/todos/create-todo", [TodosController::class, "create"])->name("create.todo.page");
    //store
    Route::post("/todos/create-todo", [TodosController::class, "store"])->name("todos.store");
    Route::get("/todos/delete/{id}", [TodosController::class, "destroy"])->name("todos.delete");
    //todos complated
    Route::get("/todos/complete/{id}", [TodosController::class, "completed"])->name("todos.complete");
    //update todos
    Route::get("/todos/update/{id}", [TodosController::class, "edit"])->name("todos.edit");
    Route::put("/todos/update/{id}", [TodosController::class, "update"])->name("todos.update");
    //archive add todo route
    Route::get("/todos/archive/{id}", [TodosController::class, "addArchive"])->name("todos.archive");
    //archive todos page
    Route::get("/todos/archive", [TodosController::class, "archive"])->name("todos.archive.page");
    //remove
    Route::get("/todos/remove-archive/{id}", [TodosController::class, "removeArchive"])->name("todos.remove.archive");
    //category
    Route::get("/category", [CategoryController::class, "index"])->name("category.pages");
    //create category page
    Route::get("/category/create-category", [CategoryController::class, "create"])->name("create.category.page");
    //store category
    Route::post("/category/create-category", [CategoryController::class, "store"])->name("category.store");
    //delete category
    Route::get("/category/delete/{id}", [CategoryController::class, "destroy"])->name("category.delete");
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
