<?php

namespace app\controllers;


use app\core\Application;
use app\core\Constant;
use app\core\Controller;

class DashboardController extends Controller
{
    public function dashboard()
    {
        return $this->view("dashboard", "main", null);
    }

    public function authorizeRoles(): array
    {
        return [Constant::$super_administrator_role, Constant::$administrator_role];
    }
}