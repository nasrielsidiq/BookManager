<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{

            $books = Book::get();
            return response()->json($books, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve books: ' . $e->getMessage()], 500);
        }

    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|unique:books,isbn',
            'published_date' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        $book = Book::create($request->all());

        return response()->json($book, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $book = Book::findOrFail($id);

        return response()->json($book, 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{

            $request->validate([
                'title' => 'required|string|max:255',
                'author' => 'required|string|max:255',
                'isbn' => 'required|string|unique:books,isbn,' . $id,
                'published_date' => 'nullable|date',
                'description' => 'nullable|string',
            ]);

            $book = Book::findOrFail($id);
            $book->update($request->all());

            return response()->json($book, 200);
        }catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update book: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $book = Book::findOrFail($id);
        $book->delete();

        return response()->json(['message' => 'Book deleted successfully'], 200);
    }
}
