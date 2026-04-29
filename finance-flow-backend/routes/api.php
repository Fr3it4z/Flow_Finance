<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;

//Rotas Publicas
Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login']);

//Rotas Privadas
Route::middleware('auth:sanctum')->group(function () {
    //Rota de Logout
    Route::post('/logout', [AuthController::class,'logout']);

    //Outras rotas ficaram aqui

    //Rotas de categorias
    Route::apiResource('categories', CategoryController::class);
    

});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
