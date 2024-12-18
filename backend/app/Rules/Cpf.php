<?php

namespace App\Rules;

use Bissolli\ValidadorCpfCnpj\CPF as ValidadorCPF;
use Illuminate\Contracts\Validation\Rule;

class Cpf implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        // Remove caracteres especiais do CPF
        $cpf = preg_replace('/[^0-9]/', '', $value);

        // Valida o CPF usando a biblioteca
        return (new ValidadorCPF($cpf))->isValid();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Invalid CPF.';
    }
}