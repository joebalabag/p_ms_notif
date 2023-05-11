const router = require('express').Router();
const authenticate = require('../../middleware/authenticate');//require('../../../middleware/authenticate');
const ctrl = require('./tenant-controller');
const myroute = '/ms';
const subroute = '/tenant';
//router.use(myroute, authenticate);

router.get(myroute + subroute + '/active', ctrl.onlyActive.bind(ctrl));
router.get(myroute + subroute + '/', ctrl.index.bind(ctrl));
router.get(myroute + subroute + '/:id', ctrl.show.bind(ctrl));
router.post(myroute + subroute + '/', ctrl.create.bind(ctrl));
router.patch(myroute + subroute + '/:id', ctrl.update.bind(ctrl));
router.delete(myroute + subroute + '/:id', ctrl.soft_delete.bind(ctrl));
router.patch(myroute + subroute + '/:id/email', ctrl.update.bind(ctrl));
router.patch(myroute + subroute + '/:id/sms', ctrl.update.bind(ctrl));


module.exports = router;