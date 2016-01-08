module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['mocha', 'coverage'],
        browsers: ['PhantomJS'],

        basePath: '',
        files: [
            'frontend/test.js',
            {
                pattern: './build/**/*',
                included: false,
                served: true,
                watched: false,
                nocache: true,
            },
        ],

        preprocessors: {
            'frontend/test.js': ['webpack'],
        },
        webpack: require('./webpack.config.js').alterConfig.getTestingConfig(),
        webpackServer: {noInfo: true},

        coverageReporter: {type: 'html', dir: 'build/coverage/'},
        proxies: {
            '/bower/': '/base/build/bower/',
        },
    });
};
