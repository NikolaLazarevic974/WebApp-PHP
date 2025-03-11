<?php

namespace app\controllers;

use app\core\Constant;
use app\core\Controller;
use app\models\ArticleModel;

class ArticleController extends Controller
{
    public function articleList()
    {
        return $this->view("articleList", "main", null);
    }

    public function articleListApi()
    {
        $model = new ArticleModel();
        echo json_encode($model->list(""));
    }

    public function authorizeRoles()
    {
        return [Constant::$super_administrator_role, Constant::$administrator_role, Constant::$korisnik_role];
    }
}