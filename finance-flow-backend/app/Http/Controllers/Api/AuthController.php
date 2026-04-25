<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //Funções para registar
    public function register(Request $request)
    {
        $scancamps = $request->validate([
            'name'=>'required|string|max:255',
        ]);
    }
}
