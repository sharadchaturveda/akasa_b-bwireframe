/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable ESLint during builds
  eslint: {
    // Set to true to ignore ESLint errors during builds
    ignoreDuringBuilds: true,
    // Directories to include in ESLint checking
    dirs: ['src'],
  },
  typescript: {
    // Set to false to enable TypeScript checking during builds
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  // Responsive image optimization for all device sizes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536, 1920, 2048, 3840], // All device sizes from mobile to 4K
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 1024, 2048], // Various image sizes for responsive design
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    minimumCacheTTL: 60,
  },
  // Disable CSS optimization for now to prevent interference
  experimental: {
    // Disable CSS optimization until we fix the interference issue
    optimizeCss: false,
    // Optimize for Largest Contentful Paint (LCP)
    largePageDataBytes: 128 * 1000,
  },
  // Optimize for code splitting and minimal JS/CSS
  compiler: {
    // Remove console logs in production, but keep our tracer logs
    removeConsole: {
      exclude: ['error', 'warn', 'log'],
    },
  },
  // Optimize for Cumulative Layout Shift (CLS)
  poweredByHeader: false,
  // Optimize webpack for code splitting and Web Vitals
  webpack: (config, { isServer, dev }) => {
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
          },
        },
      ],
      // Add this to make it work with missing files
      include: [/public\/images/],
    });

    // Optimize for code splitting
    if (!isServer && !dev) {
      // Optimize chunk splitting for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          // Create a separate chunk for the framework
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Create a separate chunk for larger libraries
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Get the name of the package
              if (!module.context) return 'npm.unknown';
              const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              const packageName = match ? match[1] : 'unknown';
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          // Create page-specific chunks
          pages: {
            name: 'pages',
            test: /[\\/]pages[\\/]/,
            priority: 20,
          },
          // Create component-specific chunks
          components: {
            name: 'components',
            test: /[\\/]components[\\/]/,
            priority: 10,
            minChunks: 2,
          },
          // Default chunk for everything else
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };

      // Optimize CSS extraction for better CLS
      if (config.plugins) {
        config.plugins.forEach((plugin) => {
          if (plugin.constructor.name === 'MiniCssExtractPlugin') {
            plugin.options.ignoreOrder = true;
          }
        });
      }
    }

    return config;
  },
  // Note: Turbopack configuration would go here if needed in the future
  // For now, we're using Webpack as the bundler
};

module.exports = nextConfig;
