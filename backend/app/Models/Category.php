<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
        // O Escudo (quais os campos que o Angular pode preencher)
    protected $fillable = [
        'user_id',
        'name',
        'type',
        'icon'
    ];
    // A Relação com a tabela users -- user_id
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // Uma Categoria TEM MUITAS Transações
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
