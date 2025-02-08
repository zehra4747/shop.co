import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { Button } from "../components/ui/button";

interface Iproducts {
    title: string,
    price: string,
    id: number
    rating?: string,
    old_price?: string
    img_url: string
}

const product: Iproducts[] = [
    {
        title: "T-SHIRT WITH TAPE DETAILS",
        id: 1,
        price: "$120",
        img_url: "/product1.png"
    },
    {
        title: "SKINNY FIT JEANS",
        id: 2,
        price: "$120",
        img_url: "/product2.png",
        old_price: "$200"
    },
    {
        title: "CHECKERED SHIRT",
        id: 3,
        price: "$120",
        img_url: "/product3.png"
    },
    {
        title: "SLEEVE STRIPED T-SHIRT",
        id: 4,
        price: "$120",
        img_url: "/product4.png",
        old_price: "$200"
    }
]

// Adding key prop in star array
const star = [
    <FaStar key={1} />,
    <FaStar key={2} />,
    <FaStar key={3} />,
    <FaStar key={4} />,
    <FaStar key={5} />,
];

export default function Products() {
    return (
        <>
        <div className="w-full h-full  mt-10 max-w-screen-xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center">NEW ARRIVALS</h1>
            <div className="relative  mt-10 overflow-x-auto flex space-x-5 px-8 ">
                {product.map((data) => {
                    return (
                        <div key={data.id} className=" flex-shrink-0">
                            <Link href={"/Products"}>
                                <div className="w-[200px] md:w-[283px] h-[200px] md:h-[290px] bg-[#F0EEED] rounded-[20px]">
                                    <Image
                                        src={data.img_url}
                                        alt={data.title}
                                        className="w-full h-full rounded-[20px]"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            </Link>
                            <div className="pl-2">
                                <p className="text-lg mt-2 font-bold">{data.title}</p>
                                <div className="flex text-yellow-400">
                                    {star.map((icon, index) => (
                                        <span key={index}>{icon}</span>
                                    ))}
                                </div>
                                <p className="font-bold mt-1">
                                    {data.price}{" "}
                                    <span className="text-gray-400 font-bold line-through">
                                        {data.old_price}
                                    </span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        <div className="flex justify-center items-start mt-5">
        <Link href="/Products">
        <Button variant={"outline"} className=" sm:mt-0 w-[80%]  sm:w-[200px] rounded-[20px]">View all</Button>
        </Link> 
        </div>
        </>
    );
}