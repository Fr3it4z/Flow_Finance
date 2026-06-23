<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    // O Escudo (quais os campos que o Angular pode preencher)
    protected $fillable = [
        'user_id',
        'category_id',
        'amount',
        'description',
        'transaction_date',
        'type'
    ];
    // A Relação com a tabela users -- user_id
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    //A Relação com a tabela categoria -- category_id
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
