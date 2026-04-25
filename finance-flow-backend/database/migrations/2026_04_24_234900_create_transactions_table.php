<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('transactions', function (Blueprint $table) {
        $table->id(); // Equivalente ao teu INT AUTO_INCREMENT PRIMARY KEY
        $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // A chave estrangeira perfeita!
        $table->foreignId('category_id')->constrained();
        $table->decimal('amount', 10, 2); 
        $table->string('description')->nullable(); // Descrição da transação, pode ser nula
        $table->date('transaction_date'); // Data da transação
        $table->enum('type', ['income', 'expense']); // Tipo da transação: receita ou despesa
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
