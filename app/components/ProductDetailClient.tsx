'use client';

import { useCart } from "@/CartContext"; // Ensure correct import path
import Image from "next/image";
import { Any, PortableText } from "next-sanity";

interface Product {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    slug: { current: string };
    content: Any;
}

interface ProductDetailClientProps {
    product: Product;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product); // Call the addToCart function from the context
        alert(`${product.name} has been added to your cart!`); // Show an alert after adding to cart
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
                <Image
                    src={product.imageUrl}
                    width={400}
                    height={400}
                    alt={product.name}
                    className="rounded-lg shadow-md object-cover"
                />
            </div>
            <div className="space-y-6 mt-10">
                <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">{product.name}</h1>
                <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
                <div className="flex items-center space-x-4">
                    <p className="text-2xl font-semibold text-gray-900">${product.price}</p>
                </div>
                <button
                    className="bg-black text-white py-3 px-4 rounded-md text-lg hover:bg-gray-800 transition duration-300"
                    onClick={handleAddToCart} // Add the handler for Add to Cart
                >
                    Add to Cart
                </button>
            </div>
            <div className="mt-12">
                <section className="text-base leading-normal text-gray-700 mt-4">
                    <PortableText value={product.content} />
                </section>
            </div>
        </div>
    );
};

export default ProductDetailClient;
