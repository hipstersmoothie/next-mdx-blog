const generateBlog = require('./generate-blog-index');

class BlogIndexPlugin {
  getChangedFiles(compiler) {
    const { watchFileSystem } = compiler;
    const watcher = watchFileSystem.watcher || watchFileSystem.wfs.watcher;

    return Object.keys(watcher.mtimes);
  }

  apply(compiler) {
    // Set up blog index at start
    compiler.hooks.environment.tap('MyPlugin', () => {
      generateBlog();
    });

    // Re generate blog index when MDX files change
    compiler.hooks.watchRun.tap('MyPlugin', () => {
      const changedFile = this.getChangedFiles(compiler);

      if (changedFile.find(file => file.includes('.mdx'))) {
        generateBlog();
      }
    });
  }
}

module.exports = (pluginOptions = {}) => (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        );
      }

      config.plugins.push(new BlogIndexPlugin());

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};
