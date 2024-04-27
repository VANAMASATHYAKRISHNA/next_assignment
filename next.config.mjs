/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/population",
        permanent: true,
      },
    ];
  }
};


export default nextConfig;
