/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    minimumCacheTTL: 60,
  },
  // Disable experimental CSS optimization to avoid critters dependency issues
  experimental: {
    optimizeCss: false,
  },
  // Handle missing assets more gracefully
  webpack: (config, { isServer }) => {
    // Add a fallback for missing image files
    config.module.rules.push({
      test: /\.(jpg|jpeg|png|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            emitFile: !isServer,
            name: '[path][name].[ext]',
            publicPath: '/_next/',
            fallback: {
              loader: 'url-loader',
              options: {
                limit: 1,
                fallback: require.resolve('responsive-loader'),
                name: '[path][name].[ext]',
                emitFile: !isServer,
              },
            },
          },
        },
      ],
      // Add this to make it work with missing files
      include: [/public\/images/],
    });

    return config;
  },
};

module.exports = nextConfig;
