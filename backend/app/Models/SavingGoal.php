<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SavingGoal extends Model
{
    // O Escudo (quais os campos que o Angular pode preencher)
    protected $fillable = [
        'user_id',
        'name',
        'target_amount',
        'current_amount',
        'due_date'
    ];
    // A Relação com a tabela users -- user_id
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}