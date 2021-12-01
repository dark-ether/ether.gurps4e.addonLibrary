
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
	// Other rules...
	plugins: [
		new NodePolyfillPlugin()
	],
    resolve:{
        extensions: [".js","jsx",".json",".ts",".tsx"],
        fallback:{
            "fs":false,
            "path": require.resolve("path-browserify")
        }
    }
};
