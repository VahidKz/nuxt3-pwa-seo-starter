import withNuxt from './.nuxt/eslint.config.mjs'

if (!Object.groupBy) {
  Object.groupBy = function groupBy(items, callback) {
    return items.reduce((accumulator, item, index) => {
      const key = callback(item, index)
      accumulator[key] ||= []
      accumulator[key].push(item)
      return accumulator
    }, {})
  }
}

export default withNuxt({
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
}, {
  ignores: ['.output/**', '.nuxt/**', 'dist/**']
})
