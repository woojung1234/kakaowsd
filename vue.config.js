const { defineConfig } = require("@vue/cli-service");
const dotenv = require("dotenv");
const path = require("path");

// .env-prod 파일을 명시적으로 로드
dotenv.config({ path: path.resolve(__dirname, ".env-prod") });

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production"
    ? "/kakaowsd/" // GitHub 레포지토리 이름에 맞춤
    : "/",
  chainWebpack: (config) => {
    config.plugin("define").tap((args) => {
      args[0]["process.env"] = JSON.stringify(process.env);
      return args;
    });
  },
});
