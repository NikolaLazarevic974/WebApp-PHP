<?php

namespace app\models;

use app\core\Model;

class UserModel extends Model
{
    public string $password;
    public string $name;
    public string $email;
    public string $phone_number;

    public function writeAttributes(): array
    {
        return ["password", "name", "phone_number", "active", "email"];
    }

    public function readAttributes(): array
    {
        return ["id", "password", "name", "phone_number", "active", "email"];
    }

    public function tableName(): string
    {
        return "user";
    }

    public function rules(): array
    {
        return [
            'password' => [self::RULE_REQUIRED],
            'phone_number' => [self::RULE_REQUIRED],
            'email' => [self::RULE_REQUIRED, self::RULE_EMAIL],
            'active' => [self::RULE_BOOL],
            'name' => [self::RULE_REQUIRED]
        ];
    }
    /*
    lazarevicnikola350@gmail.com - 123 - korisnik
    nikola.lazarevic.21@singimail.rs - 123 - admin
    nikola@gmail.com - 123 - superadmin
    
    */
}