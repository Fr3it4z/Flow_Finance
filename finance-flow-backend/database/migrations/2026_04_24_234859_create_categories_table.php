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
    Schema::create('categories', function (Blueprint $table) {
        $table->id(); // Equivalente ao teu INT AUTO_INCREMENT PRIMARY KEY
        $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // A chave estrangeira perfeita!
        $table->string('name');
        $table->enum('type', ['income', 'expense']);
        $table->string('icon', 50)->nullable(); // O nullable() permite que este campo fique vazio
        $table->timestamps(); // Cria o created_at e updated_at automaticamente
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
