<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    //Funções para registar
    public function register(Request $request)
    {
        //Validar os campos antes de aceita-los
        $scancamps = $request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|string|min:6'
        ]);

        //Criar o Utilizador na bd e faz o hash
        $user = User::create([
            'name'=>$scancamps['name'],
            'email'=>$scancamps['email'],
            'password'=>Hash::make($scancamps['password'])
        ]);

        //Criar o token para o user
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'=> 'Conta criada com sucesso',
            'token'=> $token
        ],201);
    }
    public function login(Request $request) 
    {
        $scancamps = $request->validate([
            'email'=>'required|string|email',
            'password'=>'required|string|min:6'
        ]);

        $user = User::where('email',$scancamps['email'])->first();

        //Validação de campos da password
        if(!$user || !Hash::check($scancamps['password'],$user -> password))
        {
            return response()->json(['message' => 'Credenciais incorretas'], 401);
        }
        
        // Se tudo estiver bem, gera um novo Token
        $token = $user->createToken('auth_token')->plainTextToken;

        //login sucesso
        return response()->json([
            'message' => 'Login efetuado com sucesso!',
            'token' => $token
        ]);
    }
    //Fazer lougout
    public function logout(Request $request)
    {
        //search the token and remove
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout efetuado com sucesso. Volte sempre!'
        ]);
    }
}
