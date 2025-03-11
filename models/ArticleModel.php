<?php

namespace app\models;

use app\core\Model;

class ArticleModel extends Model
{
    public int $id;
    public string $type;
    public string $brand;
    public string $name;
    public int $price;
    public string $description;
    public string $image_path;

    public function writeAttributes(): array
    {
        return ["type", "brand", "name", "price", "image_path", "active"];
    }

    public function readAttributes(): array
    {
        return ["id", "type", "brand", "name", "price", "image_path", "active"];
    }

    public function rules(): array
    {
        return [
            "type" => [self::RULE_REQUIRED],
            "brand" => [self::RULE_REQUIRED],
            "name" => [self::RULE_REQUIRED],
            "price" => [self::RULE_REQUIRED, self::RULE_NUMBER],
            "image_path" => [self::RULE_REQUIRED],
            "active" => [self::RULE_BOOL]
        ];
    }

    public function tableName(): string
    {
        return "article";
    }
}