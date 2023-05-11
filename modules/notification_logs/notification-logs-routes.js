const router = require('express').Router();
const authenticate = require('../../middleware/authenticate'); //require('../../../middleware/authenticate');
const ctrl = require('./notification-logs-controller');
const myroute = '/ms';
const subroute = '/notification';
//router.use(myroute, authenticate);

router.post(myroute + subroute + '/:id/:public_key/send-notif', ctrl.send_notif.bind(ctrl));

router.get(myroute + subroute + '/:id/:public_key/email-template-list', ctrl.email_templates.bind(ctrl));

router.post(myroute + subroute + '/:id/:public_key/generate-verification-key', ctrl.generate_verification_key.bind(ctrl));
router.patch(myroute + subroute + '/:id/:public_key/verify-key', ctrl.verify_key.bind(ctrl));

// router.get(myroute + subroute + '/active', ctrl.onlyActive.bind(ctrl));
// router.get(myroute + subroute + '/', ctrl.index.bind(ctrl));
// router.get(myroute + subroute + '/:id', ctrl.show.bind(ctrl));
// router.post(myroute + subroute + '/', ctrl.create.bind(ctrl));
// router.patch(myroute + subroute + '/:id', ctrl.update.bind(ctrl));
// router.delete(myroute + subroute + '/:id', ctrl.soft_delete.bind(ctrl));
// router.patch(myroute + subroute + '/:id/email', ctrl.update.bind(ctrl));
// router.patch(myroute + subroute + '/:id/sms', ctrl.update.bind(ctrl));

module.exports = router;
