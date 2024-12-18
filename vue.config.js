const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/kakaowsd/'  // 'moviewsd'는 GitHub 레포지토리 이름과 동일하게 설정합니다.
      : '/'
})
