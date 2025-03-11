<?php

namespace app\models;

use app\core\Model;

class OrderItemModel extends Model
{
    public string $brand;
    public string $name;
    public int $price;
    public string $image_path;
    public string $description;
    public int $quantity;
    public string $created_on;
    public int $order_id;
    public string $created_by;

    public function writeAttributes(): array
    {
        return [
            "brand",
            "name",
            "price",
            "image_path",
            "quantity",
            "created_on",
            "order_id",
            "created_by"
        ];
    }

    public function readAttributes(): array
    {
        return [
            "id",
            "brand",
            "name",
            "price",
            "image_path",
            "quantity",
            "created_on",
            "order_id",
            "created_by"
        ];
    }

    public function rules(): array
    {
        return [];
    }

    public function tableName(): string
    {
        return "order_item";
    }
}