import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

interface Iproducts{
    title:string,
    price:string,
    id:number
    rating?:string,
    old_price?:string
    img_url:string
    
}

const product:Iproducts[] = [
    {
     title:"T-SHIRT WITH TAPE DETAILS",
     id:1,
     price:"$120",
     img_url:"/product1.png"
     
    },
    {
     title:"SKINNY FIT JEANS",
     id:2,
     price:"$120",
     img_url:"/product2.png",
     old_price:"$200"
    },
    {
     title:"CHECKERED SHIRT",
     id:3,
     price:"$120",
     img_url:"/product3.png"
    },
    {
     title:"T-SHIRT WITH TAPE DETAILS",
     id:13,
     price:"$120",
     img_url:"/images/sell1.png"
    },
    {
     title:"SKINNY FIT JEANS",
     id:14,
     price:"$120",
     img_url:"/images/sell2.png",
     old_price:"$200"
    },
    {
     title:"CHECKERED SHIRT",
     id:15,
     price:"$120",
     img_url:"/images/sell4.png",
    },
    {
     title:"T-SHIRT WITH TAPE DETAILS",
     id:16,
     price:"$120",
     img_url:"/images/might1.png"
    },
    {
     title:"SKINNY FIT JEANS",
     id:17,
     price:"$120",
     img_url:"/images/might2.png",
     old_price:"$200"
    },
    {
     title:"CHECKERED SHIRT",
     id:18,
     price:"$120",
     img_url:"/images/might3.png"
    },
    
]
// Adding key prop in star array
const star = [
    <FaStar key={1} />,
    <FaStar key={2} />,
    <FaStar key={3} />,
    <FaStar key={4} />,
    <FaStar key={5} />,
  ];
  
export default function Shirt(){
    return(
        <div className="w-full h-full">
            <h1 className="text-[25px] font-bold  relative pl-5">Casual <span className=" text-sm font-bold  flex items-center justify-center absolute right-10 top-2">Most Popular <RiArrowDropDownLine/></span></h1>
            <div className="grid grid-cols-2 md:grid-cols-3 p-2 md:p-0 md:place-items-center">
                {/* flex flex-col md:flex-row justify-center items-center md:justify-between px-8 mt-10 */}
                {
                    product.map((data,index)=>{
                        return(
                              <div className={` ${data.id === 3 ? 'hidden' : 'hiddin'} md:block mb-6 mt-1`} key={index}>
                                 <Link href={`/product/${data.id}`}>
                                 <div className="w-[160px] md:w-[240px] md:h-[240x] lg:w-[290px] h-[160px] lg:h-[290px] bg-[#F0EEED] rounded-[20px]" key={index}>
                                  <Image src={data.img_url} alt={data.title}
                                  className="w-full h-full rounded-[20px]"
                                 width={100} height={100}></Image>
                                 
                                  </div>
                                 </Link>
                                <div>
                                <p className="text-sm md:text-lg mt-2 font-bold" key={index}>{data.title}</p>
                                {/* <p className="flex text-yellow-400">{star}</p> */}
                                <div className="flex text-yellow-400">
                                 {/* Map stars correctly */}
                                 {star.map((icon, index) => (
                                   <span key={index}>{icon}</span>
                                 ))}
                               </div>
                                <p  className="font-bold mt-1" key={index}>{data.price} <span className="text-gray-400 font-bold line-through"> {data.old_price} </span></p>
                                </div>
                              </div>
                        )
                    })
                }
            </div>
        </div>
    )
}