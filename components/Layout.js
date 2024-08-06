import Nav from "@/components/Nav";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen flex items-center justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-md transition-transform transform hover:scale-105 hover:shadow-3xl">
          <div className="flex justify-center mb-8">
            <Logo className="w-32 h-auto" />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>
          <p className="text-gray-600 text-center mb-8">Please sign in to access the admin dashboard.</p>
          <button
            onClick={() => signIn('google')}
            className="w-full py-4 px-6 bg-blue-800 text-white rounded-lg shadow-lg hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)} className="text-gray-700 transition-transform transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo className="w-32 h-auto" />
        </div>
      </div>

      <div className="flex flex-grow">
        <Nav show={showNav} />
        <main className="flex-grow p-8 bg-white shadow-md rounded-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}
