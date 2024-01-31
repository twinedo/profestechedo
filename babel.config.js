module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'], //removing consoles.log from app during release (production) versions
    },
  },
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@assets': './src/assets',
          '@components': './src/components',
          '@navigations': './src/navigations',
          '@screens': './src/screens',
          '@services': './src/services',
          '@stores': './src/stores',
          '@styles': './src/styles',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
