module.exports = {
  compress: true,
  swcMinify: false,
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_DEVELOPER_URL: 'https://server-consigov-6da12745ea09.herokuapp.com',
    // NEXT_PUBLIC_API_DEVELOPER_URL: 'https://server-developer-330e36c8824b.herokuapp.com',
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
