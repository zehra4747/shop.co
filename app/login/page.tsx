import { SignedIn, SignedOut,  SignInButton, 
   UserButton } from "@clerk/nextjs";
import Link from "next/link";


// pages/login.tsx
const LoginPage = () => {
    return (

      <div className="mt-5 min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 mb-8 items-center">
         <div className="text-center">  <SignedIn>
                <UserButton/>
                <div className="bg-gray-100 p-4 border border-gray-300 rounded-md shadow-md flex flex-col items-center justify-center">
  <h1 className="text-lg font-bold text-gray-600 mb-2">Login successful!</h1>
  <p className="text-gray-500 whitespace-nowrap">Go back to shopping and find great offers</p>
  <Link href="/"><p className="text-3xl font-extrabold mt-6">SHOP.CO</p></Link>
</div>

            </SignedIn></div>  

            <SignedOut>
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div
      
              className="w-full bg-black text-center text-white py-2 px-4 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
             
                <SignInButton mode="modal"/>
           
          
          
           </div>
          </form>
          </SignedOut>
        </div>
      </div>
    );
  };
  
  export default LoginPage;