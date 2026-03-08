<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8']
        ];

    }

    public function messages(): array
    {
        return [
            'first_name.required' => "First name is required",
            'last_name.required' => "Last name is required",
            'email.required' => "Email is required",
            'password.required' => "Password is required",
            'password.min' => "Password must be at least 8 characters long",
            'email.unique' => "This email is already registered",
            'email.email' => "Please enter a valid email address",
            'first_name.max' => "First name cannot exceed 255 characters",
            'last_name.max' => "Last name cannot exceed 255 characters",
        ];

    }
}
