import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-full mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-blue-900">
              Hello, <b>{session?.user?.name}</b>
            </h2>
            <div className="flex items-center bg-gray-200 gap-2 text-black rounded-lg p-2 shadow-sm">
              <img
                src={session?.user?.image}
                alt="User avatar"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <span className="text-lg font-medium">
                {session?.user?.name}
              </span>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Dashboard</h3>
            <p className="text-gray-600 mb-4">Welcome to the admin dashboard. Below is a preview of the home page of the e-commerce site.</p>
            
            {/* Preview of the Home Page */}
            <div className="w-full h-[80vh] overflow-hidden rounded-lg border border-gray-300 shadow-md">
              <iframe
                src="https://ecommerce-front-1.vercel.app"
                title="E-Commerce Home Page"
                width="100%" 
                height="100%"
                style={{ border: 'none' }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}


