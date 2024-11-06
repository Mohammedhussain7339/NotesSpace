/**  
 * @type {import('next').NextConfig} */

const nextConfig = {
    env: {
      MONGO_URI: process.env.MONGO_URI,
      NEXT_PUBLIC_JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET, // Now accessible in the client side
  
      },
    
};

export default nextConfig;
