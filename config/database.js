exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://jamesonhill:123456@ds149491.mlab.com:49491/my-shows-app';

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                        'mongodb://jamesonhill:123456@ds149491.mlab.com:49491/test-my-shows-app';

exports.PORT = process.env.PORT || 8080;

