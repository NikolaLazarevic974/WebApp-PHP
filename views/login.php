<?php
/** @var $params AuthModel
 */

use app\core\Application;
use app\models\AuthModel;

$message = Application::$app->session->getFlash("flash_error");

if ($message) {
    echo '<div class="alert alert-success">' . $message . '</div>';
}

?>

<form action="/loginPost" method="post">
    <div class="mb-3">
        <?php Application::$app->form->renderInput($params, 'email', 'Email', 'email', 'Please enter email'); ?>
    </div>
    <div class="mb-3">
        <?php Application::$app->form->renderInput($params, 'password', 'Password', 'password', 'Please enter password'); ?>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
        Sign In
    </button>
    <div class="d-flex align-items-center justify-content-center">
        <p class="fs-4 mb-0 fw-bold">New to our site?</p>
        <a class="text-primary fw-bold ms-2" href="/registration">Create an account</a>
    </div>
</form>