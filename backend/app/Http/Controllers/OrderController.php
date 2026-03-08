<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display orders.
     * Admin: all orders. Customer: own orders only.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            $orders = Order::with(['user', 'items.product'])->latest()->get();
        } else {
            $orders = Order::with('items.product')
                ->where('user_id', '=', $user->id)
                ->latest()
                ->get();
        }

        return response()->json($orders);
    }

    /**
     * Create an order from the user's cart (checkout).
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $cartItems = Cart::with('product')
            ->where('user_id', '=', $user->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Your cart is empty.'], 422);
        }

        // Validate stock for all items
        foreach ($cartItems as $cartItem) {
            if ($cartItem->product->stock < $cartItem->quantity) {
                return response()->json([
                    'message' => "Insufficient stock for {$cartItem->product->name}."
                ], 422);
            }
        }

        // Calculate total price
        $totalPrice = $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });

        // Create order in a transaction
        $order = DB::transaction(function () use ($user, $cartItems, $totalPrice) {
            $order = Order::create([
                'user_id'     => $user->id,
                'total_price' => $totalPrice,
                'status'      => 'pending',
            ]);

            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity'   => $cartItem->quantity,
                    'price'      => $cartItem->product->price,
                ]);

                // Decrement stock
                $cartItem->product->decrement('stock', $cartItem->quantity);
            }

            // Clear the user's cart
            Cart::where('user_id', '=', $user->id)->delete();

            return $order;
        });

        return response()->json($order->load('items.product'), 201);
    }

    /**
     * Display a specific order.
     */
    public function show(Request $request, Order $order)
    {
        $user = $request->user();

        // Customers can only view their own orders
        if (!$user->isAdmin() && $order->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        return response()->json($order->load('items.product'));
    }
}
