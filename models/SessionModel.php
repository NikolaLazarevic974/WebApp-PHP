<?php

namespace app\models;

class SessionModel
{
    public int $id;
    public string $email;
    public array $roles = [];
}