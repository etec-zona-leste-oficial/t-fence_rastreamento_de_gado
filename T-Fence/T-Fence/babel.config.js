module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // A secção de plugins é a mais importante
    plugins: [
      // Esta linha ativa as animações do Bottom Sheet
      'react-native-reanimated/plugin',
    ],
  };
};