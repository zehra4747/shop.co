/* import React from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { BreadcrumbCollapsed } from "@/app/components/Breadcrupm";
import { Minus, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Product } from "@/types"; // Ensure correct import

interface CartProps {
  cart: Product[];
}

const Cart: React.FC<CartProps> = ({ cart = [] }) => {
  const subtotal = cart.reduce((acc: number, item: Product) => acc + item.price, 0);
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  // Debugging: Log cart state when rendering
  console.log("Rendering Cart, current state:", cart);

  return (
    <div className="flex flex-col justify-center items-center max-w-screen-2xl mx-auto relative">
      <span className="absolute top-0 left-0">
        <BreadcrumbCollapsed />
      </span>
      <div className="w-[95%] max-w-[1200px] mt-10">
        <h1 className="text-2xl md:text-3xl font-bold pl-2">Your cart</h1>
      </div>

      <div className="w-[95%] sm:w-full flex flex-col md:flex-row justify-center items-start gap-6 mt-4">
        <div className="w-full lg:w-[700px] space-y-4 border rounded-[20px] pt-2">
          {cart.length > 0 ? (
            cart.map((data: Product) => (
              <div className="flex justify-between border-b px-3 pb-3" key={data._id}>
                <div className="flex">
                  <div>
                    <Image src={data.imageUrl} width={100} height={100} alt="product" />
                  </div>
                  <div className="ml-3">
                    <h1 className="font-bold">{data.name}</h1>
                    <p>Size: {data.size || "N/A"}</p>
                    <p>Color: {data.color || "N/A"}</p>
                    <p className="font-bold">${data.price}</p>
                  </div>
                </div>
                <div className="relative">
                  <MdDelete className="absolute top-0 text-xl right-0 sm:right-3 text-red-500" />
                  <div className="md:w-[100px] h-[40px] flex justify-between p-3 items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 absolute bottom-0 right-0">
                    <Minus />
                    1
                    <Plus />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div className="bg-white p-4 w-full lg:w-[500px] border rounded-[20px]">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount (-20%)</p>
              <p>-${discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center">
              <input className="h-10 rounded-[6px] bg-[#F0F0F0] px-4 w-[200px] md:w-[360px] border-none" type="search" placeholder="Add promo code" />
              <Button className="w-[100px] rounded-[20px]">Apply</Button>
            </div>
          </div>
          <button className="w-full mt-4 bg-black text-white py-2 rounded-md">
            Go to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart; */






'use client';

import React, { useState } from 'react';
import { useCart } from '@/CartContext';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import { Minus, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { BreadcrumbCollapsed } from '@/app/components/Breadcrupm'; // Adjust path if necessary
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { client } from '@/sanity/lib/client';
import { Any } from 'next-sanity';


interface CartItem {
  _id: string;
  imageUrl: string | StaticImport;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [orderConfirmed, setOrderConfirmed] = useState(false); // State to track if order is confirmed
  const [showOrderMessage, setShowOrderMessage] = useState(false); // State to track message for zero total
  const [showCheckout, setShowCheckout] = useState(false); // State to show/hide checkout section
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    number: '',
  });

  const [formErrors, setFormErrors] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    number: '',
  });

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const handleDecreaseQuantity = (productId: string, quantity: number) => {
    if (quantity > 1) {
      updateQuantity(productId, quantity - 1);
    }
  };

  const handleIncreaseQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity + 1);
  };

  const subtotal = cart.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  // Handle Go to Checkout button click
  const handleGoToCheckout = () => {
    if (total === 0) {
      setShowOrderMessage(true); // Show message if total is zero
    } else {
      setShowCheckout(true); // Show checkout section
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); // Clear error when user starts typing
  };

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    const errors = {
      fullName: '',
      address: '',
      city: '',
      zipCode: '',
      country: '',
      number: '',
    };

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
      isValid = false;
    }
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
      isValid = false;
    }
    if (!formData.city.trim()) {
      errors.city = 'City is required';
      isValid = false;
    }
    if (!formData.zipCode.trim()) {
      errors.zipCode = 'Zip Code is required';
      isValid = false;
    }
    if (!formData.country.trim()) {
      errors.country = 'Country is required';
      isValid = false;
    }
    if (!formData.number.trim()) {
      errors.number = 'Phone Number is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle order confirmation
  const handleConfirmOrder = async () => {
    if (validateForm()) {
      setIsLoading(true); // Set loading state to true
      const orderData = {
        _type: 'order',
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        country: formData.country,
        number: formData.number,
        cartItems: cart.map((item: { _id: Any; }) => ({
          _type: 'reference',
          _ref: item._id, // Ensure `item._id` is the correct reference to a `products` document
        })),
        total: total,
      };

      try {
        await client.create(orderData); // Send the order data to Sanity
        localStorage.removeItem('applied'); // Clear local storage if needed
        setOrderConfirmed(true); // Set the order as confirmed
        setShowCheckout(false); // Hide checkout section
      } catch (error) {
        console.error('Error creating order:', error);
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    }
  };

  return (
   
    <div className="flex flex-col justify-center items-center max-w-screen-2xl mx-auto relative">
      <span className="absolute top-0 left-0">
        <BreadcrumbCollapsed />
      </span>
      <div className="w-[95%] max-w-[1200px] mt-10">
        <h1 className="text-2xl md:text-3xl font-bold mt-5 pl-2">Your cart</h1>
      </div>

      <div className="w-[95%] sm:w-full flex flex-col md:flex-row justify-center items-start gap-6 mt-4">
        <div className="w-full lg:w-[700px] space-y-4 border rounded-[20px] pt-2">
          {cart.length > 0 ? (
            cart.map((item: CartItem, index: React.Key | null | undefined) => (
              <div className="flex justify-between border-b px-3 pb-3" key={index}>
                <div className="flex">
                  <div>
                    <Image src={item.imageUrl} width={100} height={100} alt={item.name} />
                  </div>
                  <div className="ml-3">
                    <h1 className="font-bold">{item.name}</h1>
                    <div className='flex gap-2'>
                      <p>Quantity:</p>
                      <p>{item.quantity}</p>
                    </div>
                    <p className="font-bold mt-4">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <MdDelete
                    className="text-xl text-red-500 cursor-pointer"
                    onClick={() => handleRemove(item._id)}
                  />
                  <div className="md:w-[100px] h-[40px] flex justify-between p-3 items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 ml-4">
                    <Minus
                      className="cursor-pointer"
                      onClick={() => handleDecreaseQuantity(item._id, item.quantity)}
                    />
                    <span>{item.quantity}</span>
                    <Plus
                      className="cursor-pointer"
                      onClick={() => handleIncreaseQuantity(item._id, item.quantity)}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-6">Your cart is empty.</p>
          )}
        </div>

        <div className="bg-white p-4 w-full lg:w-[500px] border rounded-[20px]">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount </p>
              <p>-$0</p>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <input
                className="h-10 rounded-[6px] bg-[#F0F0F0] px-4 w-[200px] md:w-[360px] border-none"
                type="search"
                placeholder="Add promo code"
              />
              <Button className="w-[100px] rounded-[20px]">Apply</Button>
            </div>
          </div>
          <button
            className="w-full mt-4 bg-black text-white py-2 rounded-md"
            onClick={handleGoToCheckout} // Add the click handler
          >
            Proceed To Checkout
          </button>
        </div>
      </div>

      {/* Checkout Section */}
      {showCheckout && (
  <div className="w-[95%] max-w-[1200px] mt-8 p-6 border rounded-[20px] bg-white">
    <h2 className="text-2xl font-bold mb-6">Checkout</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Shipping Information */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
        <form className="space-y-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your Full Name"
              className="w-full p-2 border rounded-md"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {formErrors.fullName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your Address"
              className="w-full p-2 border rounded-md"
              value={formData.address}
              onChange={handleInputChange}
            />
            {formErrors.address && (
              <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
            )}
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label htmlFor="city" className="text-sm font-medium mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter your City"
              className="w-full p-2 border rounded-md"
              value={formData.city}
              onChange={handleInputChange}
            />
            {formErrors.city && (
              <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
            )}
          </div>

          {/* Zip Code */}
          <div className="flex flex-col">
            <label htmlFor="zipCode" className="text-sm font-medium mb-1">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              placeholder="Enter your Zip Code"
              className="w-full p-2 border rounded-md"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
            {formErrors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>
            )}
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <label htmlFor="country" className="text-sm font-medium mb-1">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Enter your Country"
              className="w-full p-2 border rounded-md"
              value={formData.country}
              onChange={handleInputChange}
            />
            {formErrors.country && (
              <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="number" className="text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="number"
              name="number"
              placeholder="Enter your Phone Number"
              className="w-full p-2 border rounded-md"
              value={formData.number}
              onChange={handleInputChange}
            />
            {formErrors.number && (
              <p className="text-red-500 text-sm mt-1">{formErrors.number}</p>
            )}
          </div>
        </form>
      </div>
    </div>

    {/* Order Review */}
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Order Review</h3>
      <div className="space-y-2">
        {cart.map((item: CartItem, index: React.Key | null | undefined) => (
          <div key={index} className="flex justify-between">
            <p>{item.name} (x{item.quantity})</p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 flex justify-between font-bold">
        <p>Total</p>
        <p>${total.toFixed(2)}</p>
      </div>
    </div>

    {/* Confirm Order Button */}
    <button
      className="w-full mt-6 bg-black text-white py-2 rounded-md"
      onClick={handleConfirmOrder}
      disabled={isLoading} // Disable button while loading
    >
      {isLoading ? 'Placing Order...' : 'Place Order'}
    </button>
  </div>
)}

      {/* Order Confirmation Message */}
      {orderConfirmed && (
        <div className="mt-10 text-center text-xl font-bold text-green-600">
          <p>Order Confirmed!</p>
        </div>
      )}

      {/* Message for Empty Cart */}
      {showOrderMessage && (
        <div className="mt-10 text-center text-xl font-bold text-red-600">
          <p>Please place an order to confirm.</p>
        </div>
      )}
    </div>
 
  );
};

export default CartPage;