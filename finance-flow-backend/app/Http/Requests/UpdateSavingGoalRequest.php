<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;


class UpdateSavingGoalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'target_amount' => ['sometimes', 'numeric', 'min:0'],
            'current_amount' => ['sometimes', 'numeric', 'min:0'],
            'due_date' => ['sometimes', 'date']
        ];
    }
}
