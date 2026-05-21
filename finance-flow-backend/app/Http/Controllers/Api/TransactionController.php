<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTransactionRequest; 
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        //Prepara a consulta as categorias deste utilizador
        $query = $request->user()->transactions();

        //Executa a consulta trazendo os resultados em paginas de 10 em 10
        $transactions = $query->paginate(10)->withQueryString();

        //Desenvolve a resposta em formato JSON
        return TransactionResource::collection($transactions);
    }
    public function store(StoreTransactionRequest $request)
    {
        // O método ->validated() devolve apenas os campos limpos e aprovados.
        $transaction = $request->user()->transactions()->create($request->validated());
        

        return response()->json(new TransactionResource($transaction, 201));
    }

    public function show(Request $request, $id)
    {
        $transaction = $request->user()->transactions()->findOrFail($id);

        return new TransactionResource($transaction);
    }

    public function update(UpdateTransactionRequest $request, string $id)
    {
        $transaction = $request->user()->transactions()->findOrFail($id);
        $transaction->update($request->validated());

        return new TransactionResource($transaction);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,string $id)
    {
        $transaction = $request->user()->transactions()->findOrFail($id);
        
        $transaction->delete();

        return response()->json(null, 204);
    }

    public function getSummary(Request $request)
    {
        $initdate = $request->query('initDate') ?? now()->startOfMonth();
        $enddate = $request->query('endDate') ?? now();
        
        $query = $request->user()->transactions()
                                ->whereBetween('transaction_date',[$initdate,$enddate]);

        $income = (clone $query)->where('type','income')->sum('amount');

        $expense = (clone $query)->where('type','expense')->sum('amount');

        $net_saving = $income - $expense;

        return response()->json([
            'income' => $income,
            'expense' => $expense,
            'net_saving'=>$net_saving
        ]);
    }
}
