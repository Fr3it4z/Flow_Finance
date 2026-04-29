<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreSavingGoalRequest;
use App\Http\Requests\UpdateSavingGoalRequest;
use App\Http\Resources\SavingGoalResource;
use App\Models\SavingGoal;

class SavingGoalController extends Controller
{
    //READ - GET, Ler todos os objetivos de poupança
    public function index(Request $request)
    {
        //Prepara a consulta aos objetivos de poupança deste utilizador
        $query = $request->user()->savingGoals();

        //Executa a consulta trazendo os resultados em paginas de 10 em 10
        $savingGoals = $query->paginate(10)->withQueryString();

        //Desenvolve a resposta em formato JSON
        return SavingGoalResource::collection($savingGoals);
    }

    public function store(StoreSavingGoalRequest $request)
    {
        // O método ->validated() devolve apenas os campos limpos e aprovados.
        $savingGoal = $request->user()->savingGoals()->create($request->validated());
        

        return response()->json(new SavingGoalResource($savingGoal), 201);
    }

    //READ - GET, Ler um objetivo de poupança específico
    public function show(Request $request, $id)
    {
        $savingGoal = $request->user()->savingGoals()->findOrFail($id);

        return new SavingGoalResource($savingGoal);
    }

    //UPDATE - PUT/PATCH, Atualizar um objetivo de poupança
    public function update(UpdateSavingGoalRequest $request, string $id)
    {
        $savingGoal = $request->user()->savingGoals()->findOrFail($id);

        $savingGoal->update($request->validated());
        
        return response()->json(new SavingGoalResource($savingGoal));
    }

    //DELETE - DELETE, Apagar um objetivo de poupança
    public function destroy(Request $request, string $id)
    {
        $savingGoal = $request->user()->savingGoals()->findOrFail($id);
        
        $savingGoal->delete();

        return response()->json(null, 204);
    }
}
