<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display the user's cart items.
     */
    public function index(Request $request)
    {
        $cartItems = Cart::with('product')
            ->where('user_id', '=', $request->user()->id)
            ->get();

        return response()->json($cartItems);
    }

    /**
     * Add a product to the cart.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        // Check stock availability
        $product = Product::findOrFail($validated['product_id']);
        if ($product->stock < $validated['quantity']) {
            return response()->json(['message' => 'Insufficient stock.'], 422);
        }

        // Check if product already in cart, update quantity
        $cartItem = Cart::where('user_id', '=', $request->user()->id)
            ->where('product_id', '=', $validated['product_id'])
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $validated['quantity'];
            $cartItem->save();
        } else {
            $cartItem = Cart::create([
                'user_id'    => $request->user()->id,
                'product_id' => $validated['product_id'],
                'quantity'   => $validated['quantity'],
            ]);
        }

        return response()->json($cartItem->load('product'), 201);
    }

    /**
     * Update a cart item quantity.
     */
    public function update(Request $request, Cart $cart)
    {
        // Ensure user owns this cart item
        if ($cart->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Check stock
        $product = Product::findOrFail($cart->product_id);
        if ($product->stock < $validated['quantity']) {
            return response()->json(['message' => 'Insufficient stock.'], 422);
        }

        $cart->update($validated);

        return response()->json($cart->load('product'));
    }

    /**
     * Remove a cart item.
     */
    public function destroy(Request $request, Cart $cart)
    {
        // Ensure user owns this cart item
        if ($cart->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $cart->delete();

        return response()->json(['message' => 'Item removed from cart.']);
    }
}
