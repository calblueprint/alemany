module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          "root": ["./"],
          "alias": {
            "src": "./src",
            "assets": "./assets",
            "components": "./src/components",
            "constants": "./src/constants",
            "database": "./src/database",
            "hooks": "./src/hooks",
            "navigation": "./src/navigation",
            "screens": "./src/screens",
            "@types": "./"
          }
        }
      ],
      ['react-native-paper/babel'],
      [
        'module:react-native-dotenv',
        {
          moduleName: "@env",
          path: '.env',
          safe: true,
        },
      ],
    ],
  };
};
