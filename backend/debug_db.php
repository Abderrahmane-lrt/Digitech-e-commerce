<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$products = \App\Models\Product::all();
foreach ($products as $product) {
    echo "ID: {$product->id}, Name: {$product->name}, Image: {$product->image}\n";
}
