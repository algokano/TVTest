module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@app': './src/app',
          '@store': './src/store',
          '@features': './src/features',
          '@tv': './src/tv',
          '@shared': './src/shared',
        },
      },
    ],
    // Worklets plugin has to be listed last
    'react-native-worklets/plugin',
  ],
};
