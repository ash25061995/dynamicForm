const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return {
            mode,
            entry: "./src/index.tsx",
            output: {
                publicPath: "/",
                path: path.resolve(__dirname, "build"),
                filename: "bundle.js"
            },
            resolve: {
                alias: {
                  components: path.resolve(__dirname, 'src/components'),
                },
                extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
              },
            module: {
                rules: [
                 {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'style-loader',
                      },
                      {
                        loader: 'css-loader',
                        options: {
                          modules: {
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                          },
                        },
                    }
                    ]
                },
                {
                    test: /\.(ts)x?$/,
                    exclude: /node_modules|\.d\.ts$/,
                    use: {
                      loader: 'ts-loader',
                      options: {
                      compilerOptions: {
                      noEmit: false,
                     },
                    },
                   },
                  },
                    {
                        test: /\.jpe?g|png$/,
                        exclude: /node_modules/,
                        use: ["url-loader", "file-loader"]
                    },
    
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "./public/index.html"
                }),
            ]
        }
};