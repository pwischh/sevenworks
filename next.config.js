module.exports = {
  experimental: {
    esmExternals: true, // Enable ESM support for external packages
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, os: false }; // Ensure compatibility with Node.js modules
    return config;
  },
};