const ReactCompilerConfig = {}

module.exports = function (api) {
  api.cache(true)

  const plugins = [
    // ['babel-plugin-react-compiler', ReactCompilerConfig], // must run first!
    ['nativewind/babel'],
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  ]

  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel', ...plugins],
      },
    },
    plugins,
  }
}
