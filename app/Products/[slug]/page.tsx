/* import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { PortableText } from "next-sanity";

export const revalidate = 10;

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    const query = `*[_type == "products" && slug.current == "${params.slug}"]{
        name,
        description,
        price,
        "imageUrl": image.asset->url,
        slug,
        content
    }[0]`;
    const product = await client.fetch(query);

    if (!product) {
        return <p className="text-center text-red-500">Product not found</p>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center items-center">
                    <Image
                        src={product.imageUrl}
                        width={400}
                        height={400}
                        alt={product.title}
                        className="rounded-lg shadow-md object-cover"
                    />
                </div>
                <div className="space-y-6 mt-10">
                    <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                        {product.name}
                    </h1>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {product.description}
                    </p>
                    <div className="flex items-center space-x-4">
                        <p className="text-2xl font-semibold text-gray-900">
                            ${product.price}
                        </p>
                    </div>
                    <button
                        className="bg-black text-white py-3 px-4 rounded-md text-lg hover:bg-gray-800 transition duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="mt-12">
                <section className="text-base leading-normal text-gray-700 mt-4">
                    <PortableText value={product.content} />
                </section>
            </div>
        </div>
    );
}
 */
import ProductDetailClient from "@/app/components/ProductDetailClient";
import { client } from "@/sanity/lib/client";
 // Client-side component for cart functionality

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    // Fetch product data from Sanity
    const query = `*[_type == "products" && slug.current == "${params.slug}"]{
        name,
        description,
        price,
        "imageUrl": image.asset->url,
        slug,
        content
    }[0]`;
    const product = await client.fetch(query);

    if (!product) {
        return <p className="text-center text-red-500">Product not found</p>;
    }

    // Pass the product data to the client-side component
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <ProductDetailClient product={product} />
           
        </div>
    );
}
