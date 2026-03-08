<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name'        => 'Mechanical Gaming Keyboard',
                'description' => 'RGB backlit mechanical keyboard with Cherry MX switches, customizable macros, and anti-ghosting technology.',
                'price'       => 79.99,
                'stock'       => 50,
                'image'       => null,
            ],
            [
                'name'        => 'Wireless Gaming Mouse',
                'description' => 'Ultra-lightweight wireless mouse with 25K DPI sensor, 70-hour battery life, and ergonomic design.',
                'price'       => 59.99,
                'stock'       => 75,
                'image'       => null,
            ],
            [
                'name'        => '27" 4K IPS Monitor',
                'description' => '27-inch 4K UHD IPS display with 144Hz refresh rate, HDR400, and USB-C connectivity.',
                'price'       => 449.99,
                'stock'       => 20,
                'image'       => null,
            ],
            [
                'name'        => 'USB-C Docking Station',
                'description' => '12-in-1 USB-C hub with dual HDMI, Ethernet, SD card reader, and 100W Power Delivery.',
                'price'       => 89.99,
                'stock'       => 40,
                'image'       => null,
            ],
            [
                'name'        => 'Noise-Cancelling Headset',
                'description' => 'Over-ear gaming headset with active noise cancellation, 7.1 surround sound, and detachable microphone.',
                'price'       => 129.99,
                'stock'       => 35,
                'image'       => null,
            ],
            [
                'name'        => 'Extended RGB Mouse Pad',
                'description' => 'Large desk-size RGB mouse pad with micro-textured surface and 12 lighting modes.',
                'price'       => 34.99,
                'stock'       => 100,
                'image'       => null,
            ],
            [
                'name'        => 'Webcam 4K HDR',
                'description' => '4K Ultra HD webcam with auto-focus, built-in ring light, and dual noise-reducing microphones.',
                'price'       => 99.99,
                'stock'       => 30,
                'image'       => null,
            ],
            [
                'name'        => 'Monitor Arm Mount',
                'description' => 'Gas spring single monitor arm supporting up to 32" displays with full motion adjustment.',
                'price'       => 44.99,
                'stock'       => 60,
                'image'       => null,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
