const { defineConfig } = require("@vue/cli-service");
const dotenv = require("dotenv");
const path = require("path");

// .env 파일 로드
const envPath =
  process.env.NODE_ENV === "production"
    ? ".env-prod"
    : ".env-dev";

dotenv.config({ path: path.resolve(__dirname, envPath) });

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production"
    ? "/kakaowsd/" // GitHub 레포지토리 경로
    : "/",
});
