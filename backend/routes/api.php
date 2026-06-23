<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\SavingGoalController;

//Rotas Publicas
Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login'])->middleware('throttle:5,1'); // Máx 5 tentativas por minuto

//Rotas Privadas
Route::middleware('auth:sanctum')->group(function () {
    //Rota de Logout
    Route::post('/logout', [AuthController::class,'logout']);

    //Outras rotas ficaram aqui

    //Rotas de categorias
    Route::apiResource('categories', CategoryController::class);
    //Rotas das transações
    Route::apiResource('transactions', TransactionController::class);
    //Rotas dos objetivos de poupança
    Route::apiResource('saving-goals', SavingGoalController::class);

});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
