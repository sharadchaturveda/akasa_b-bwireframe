/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize images for better LCP
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    minimumCacheTTL: 60,
  },
  // Enable optimizations for Web Vitals
  experimental: {
    // Enable CSS optimization for production
    optimizeCss: process.env.NODE_ENV === 'production',
    // Optimize for First Input Delay (FID)
    optimizeServerReact: true,
    // Optimize for Largest Contentful Paint (LCP)
    largePageDataBytes: 128 * 1000,
  },
  // Optimize for code splitting and minimal JS/CSS
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
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
