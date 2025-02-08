/* /** @type {import('next').NextConfig} */
/*const nextConfig = {
   images: {
        domains: ['cdn.sanity.io'], // Add any other domains as needed
      },
};

export default nextConfig; */
///next.config.mjs
 const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Adjust the hostname to match your Sanity project's image CDN
        port: '', // Usually empty for HTTPS
   
      },
    ],
  },
};

export default nextConfig; 
/* 
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Adjust the hostname to match your Sanity project's image CDN
        port: '', // Usually empty for HTTPS
   
      },
    ],
  },
};
 */
