/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      use: ["webpack-glsl-loader"],
    })

    return config
  },
}
