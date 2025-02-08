/* ///mehak
"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Any, createClient } from "next-sanity";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import { BreadcrumbCollapsed } from "../components/Breadcrupm";

const client = createClient({
  projectId: "i2rafnty",
  dataset: "production",
  apiVersion: "v2025-01-18",
  useCdn: true, 
});

interface Product {
  slug: any;
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string; // Use imageUrl instead of image
  tags: string[];
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  // Fetch products from Sanity
  const fetchProducts = async () => {
    try {
      const query = `*[_type == "products"]{
        _id,
        name,
        price,
        description,
        "imageUrl": image.asset->url,
        slug,
        tags
      }`;
      const data = await client.fetch(query);
      console.log("Fetched Products:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Add a product to the cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} has been added to Cart`);
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
        <BreadcrumbCollapsed/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-24 md:gap-16 gap-5 m-7 mt-16">
    
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform transition ease-in-out hover:scale-105"
            >
          <Link  href={`/Products/${product.slug.current}`}>   <Image
                src={product.imageUrl} // Use imageUrl here
                alt={product.name}
                width={250}
                height={250}
                className="w-full h-56 object-cover"
              /></Link> 
              <div className="p-4">
                <h2 className="text-md font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold text-gray-800 mt-2">${product.price}</p>
                <button
                  className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-slate-800"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      <div className="mt-8 bg-slate-100 p-6 rounded-lg shadow-md ml-14 mr-14">
        <h2 className="text-xl font-semibold text-gray-800">Cart Summary</h2>
        {cart.length > 0 ? (
          <ul className="space-y-4 mt-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex  bg-slate-200 rounded-md shadow-sm p-4"
              >
                <Image
                  src={item.imageUrl} // Use imageUrl here
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                 <p className="text-gray-800 mr-10">{item.name}</p>
                <p className="font-medium text-gray-800 right-0">${item.price.toFixed(2)}</p>
               
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-800">Your Cart is Empty</p>
        )}
      </div>
      
    </div>
  );
};

export default ProductCards;  */



// ProductCards.js
/* 
'use client'; // Ensure this file is treated as a client-side component

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "next-sanity";
import Link from "next/link";
import { useCart } from '@/CartContext'; // Import your useCart hook

// Sanity Client setup
const client = createClient({
  projectId: "i2rafnty",
  dataset: "production",
  apiVersion: "v2025-01-18",
  useCdn: true,
});

// Product type definition
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  slug: { current: string }; // Adjusted for slug structure
  tags: string[];
}

const ProductCards = () => {
  const [products, setProducts] = useState<Product[]>([]); // Typed as Product[]
  const { addToCart } = useCart(); // Cart context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "products"]{
          _id,
          name,
          price,
          description,
          "imageUrl": image.asset->url,
          slug,
          tags
        }`;
        const data = await client.fetch(query);
        setProducts(data); // Setting products with proper typing
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addToCart(product); // Call the addToCart function from the context
    alert(`${product.name} has been added to your cart!`); // Show an alert after adding to cart
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-24 md:gap-16 gap-5 m-7 mt-16">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden transform transition ease-in-out hover:scale-105">
              <Link href={`/Products/${product.slug.current}`}>
                <Image src={product.imageUrl} alt={product.name} width={250} height={250} className="w-full h-56 object-cover" />
              </Link>
              <div className="p-4">
                <h2 className="text-md font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold text-gray-800 mt-2">${product.price}</p>
                <button 
                  className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-slate-800" 
                  onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default ProductCards;
 */




'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/CartContext'; // Adjust the import path as necessary
import { createClient } from 'next-sanity';

import { BreadcrumbCollapsed } from "../components/Breadcrupm"; // Adjust if necessary

const client = createClient({
  projectId: 'i2rafnty',
  dataset: 'production',
  apiVersion: 'v2025-01-18',
  useCdn: true,
});

// Define Product interface
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string; // Adjusted for imageUrl
  slug: { current: string };
  tags: string[];
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  // Fetch products from Sanity
  const fetchProducts = async () => {
    try {
      const query = `*[_type == "products"]{
        _id,
        name,
        price,
        description,
        "imageUrl": image.asset->url,
        slug,
        tags
      }`;
      const data = await client.fetch(query);
      console.log('Fetched Products:', data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const AddToCart = (product: Product) => {
    addToCart(product); // Call the addToCart function from the context
    alert(`${product.name} has been added to your cart!`); // Show an alert after adding to cart with product name
  };

  return (
    <div>
      <BreadcrumbCollapsed />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-24 md:gap-16 gap-5 m-7 mt-16">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform transition ease-in-out hover:scale-105"
            >
              <Link href={`/Products/${product.slug.current}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={250}
                  height={250}
                  className="w-full h-56 object-cover"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-md font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold text-gray-800 mt-2">${product.price}</p>
                <button
                  className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-slate-800"
                  onClick={() => AddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default ProductCards;
