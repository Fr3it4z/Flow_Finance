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
       Schema::create('saving_goals', function (Blueprint $table) {
        $table->id(); // Equivalente ao teu INT AUTO_INCREMENT PRIMARY KEY
        $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // A chave estrangeira perfeita!
        $table->string('name');
        $table->decimal('target_amount', 10, 2); 
        
        // O valor que já tens. Repara no default(0) para não começar a null
        $table->decimal('current_amount', 10, 2)->default(0); 
        
        // A data limite. Usamos nullable() porque o utilizador pode não querer definir uma data
        $table->date('due_date')->nullable(); 
        
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saving_goals');
    }
};
