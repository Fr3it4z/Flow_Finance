<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    //READ - GET, Ler todas as categorias
    public function index(Request $request)
    {
        //Prepara a consulta as categorias deste utilizador
        $query = $request->user()->categories();

        //Executa a consulta trazendo os resultados em paginas de 10 em 10
        $categories = $query->paginate(10)->withQueryString();

        //Desenvolve a resposta em formato JSON
        return CategoryResource::collection($categories);
    }

    public function store(StoreCategoryRequest $request)
    {
        // O método ->validated() devolve apenas os campos limpos e aprovados.
        $category = $request->user()->categories()->create($request->validated());
        

        return response()->json(new CategoryResource($category, 201));
    }

    //READ - GET, Ler uma categoria específica
    public function show(Request $request, $id)
    {
        $category = $request->user()->categories()->findOrFail($id);

        return new CategoryResource($category);
    }

    //UPDATE - PUT/PATCH, Atualizar uma categoria
    public function update(UpdateCategoryRequest $request, string $id)
    {
        $category = $request->user()->categories()->findOrFail($id);

        $category->update($request->validated());
        
        return response()->json(new CategoryResource($category));
    }

    //DELETE - DELETE, Apagar uma categoria
    public function destroy(Request $request, string $id)
    {
        $category = $request->user()->categories()->findOrFail($id);
        
        $category->delete();

        return response()->json(null, 204);
    }
}
