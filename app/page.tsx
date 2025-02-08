
import { Hero } from "./components/Hero";

import Brands from "./components/Brands";

import CustomerCarousel from "@/app/components/Customer";
import Products from "./product/page";
import Top_sell from "./product/sell";
import { CartProvider } from "@/CartContext";


export default function Home() {
  return (
  <div>
    <CartProvider>
  
    <Hero/>
   
    <Brands/>
    <div className="mt-64 md:mt-0"></div>
   <div ><Products /></div> 
    <Top_sell/>
 
    <CustomerCarousel/>
    
    </CartProvider>  
  </div>
  );
}
