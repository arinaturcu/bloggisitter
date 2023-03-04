const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const config = {
    ...defaultConfig,
    entry: {
        'editor-js': './src/editor/index.js',
        'editor-css': './src/editor/editor.scss',
    },
    output: {
        filename: '[name].js',
        path: path.resolve( __dirname, 'build' )
    }
}

module.exports = config;
