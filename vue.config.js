module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  pwa: {
    name: 'Cockpit App',
    assetsVersion: '1',
    themeColor: '#001930',
    msTileColor: '#FFFFFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    workboxPluginMode: 'InjectManifest',
    workboxOptions:{
      swSrc: 'src/service-worker.js'
    },
    manifestOptions:{
      start_url: '/'
    }
  }
};
