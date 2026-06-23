<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;


class UpdateTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'category_id' => ['sometimes', 'integer', 'exists:categories,id'],
            'amount' => ['sometimes', 'numeric'],
            'description' => ['nullable', 'string', 'max:255'],
            'transaction_date' => ['sometimes', 'date'],
            'type' => ['sometimes', 'string', 'in:income,expense']
        ];
    }
}