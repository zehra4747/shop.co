 "use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "next-sanity";
import Link from "next/link";

// Sanity client setup
const client = createClient({
  projectId: "i2rafnty",
  dataset: "production",
  apiVersion: "v2025-01-18",
  useCdn: true,
});

// Define the structure of a product
interface Product {
  name: string;
  slug: { current: string };
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  // Fetch products from Sanity
  const fetchProducts = async (query: string) => {
    try {
      // Sanity query string with parameterized search
      const data = await client.fetch(
        `*[_type == "products" && name match $query]{name, slug}`,
        {
          params: { query: `${query}*` }
        });

      
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when search term changes
  useEffect(() => {
    // Trigger search immediately after the first character
    if (searchTerm.length > 0) {
      fetchProducts(searchTerm);
    } else {
      setSuggestions([]); // Clear suggestions if search term is empty
    }
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-[577px]">
      <div className="flex items-center gap-2 bg-gray-200 rounded-full w-full h-[48px] p-[12px_16px]">
        <Image
          src="/Vector (3).png"
          alt="Search Icon"
          width={20}
          height={20}
          className="w-[20px] h-[20px]"
        />
        <input
          type="text"
          placeholder="Search for products..."
          className="bg-transparent text-[16px] text-gray-600 focus:outline-none w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-10">
          {suggestions.map((product) => (
            <li key={product.slug.current} className="p-3 hover:bg-gray-100">
              <Link href={`/Products/${product.slug.current}`}>
                <p className="text-gray-800">{product.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar; 

/* 
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "next-sanity";
import Link from "next/link";

// Sanity client setup
const client = createClient({
  projectId: "i2rafnty",
  dataset: "production",
  apiVersion: "v2025-01-18",
  useCdn: true,
});

// Define the structure of a product
interface Product {
  name: string;
  slug: { current: string };
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  // Fetch products from Sanity
 
const fetchProducts = async (query: string) => {
  try {
    const data = await client.fetch<Product[]>(`
      *[_type == "products" && name match $query]{name, slug}
    `, {
      params: { query: `${query}*` }
    });
    setSuggestions(data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


  // Fetch products when search term changes
  useEffect(() => {
    if (searchTerm.length > 0) {
      fetchProducts(searchTerm);
    } else {
      setSuggestions([]); // Clear suggestions if search term is empty
    }
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-[577px]">
      <div className="flex items-center gap-2 bg-gray-200 rounded-full w-full h-[48px] p-[12px_16px]">
        <Image
          src="/Vector (3).png"
          alt="Search Icon"
          width={20}
          height={20}
          className="w-[20px] h-[20px]"
        />
        <input
          type="text"
          placeholder="Search for products..."
          className="bg-transparent text-[16px] text-gray-600 focus:outline-none w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-10">
          {suggestions.map((product) => (
            <li key={product.slug.current} className="p-3 hover:bg-gray-100">
              <Link href={`/Products/${product.slug.current}`}>
                <p className="text-gray-800">{product.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
 */

