module.exports = ({ env }) => {
  const production = env === 'production'
  return {
    map: production ? null : { inline: false },
    plugins: {
      // 'postcss-import': {},
      // 'postcss-css-variables': {},
      // 'postcss-nesting': {},
      // 'postcss-custom-media': {},
      'cssnano': production ? { 'autoprefixer': false } : false,
      'autoprefixer': { browsers: ['last 2 versions', 'iOS >= 8'] }
    }
  }
}