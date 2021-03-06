'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/api/user/list', controller.user.getList);
    router.get('/api/user/logout', controller.user.logout);
    router.post('/api/user/login', controller.user.login);
    router.post('/api/user/region', controller.user.region);
    router.post('/api/user/onlineTime', controller.user.onlineTime);
    router.get('/api/user/info', controller.user.info);
};
