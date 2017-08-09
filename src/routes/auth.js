import express from 'express';
import passport from 'passport';

const router = express.Router();

import * as authController from '../controllers/auth';

router.get('/', authController.whoami);

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['email']
    })
);

router.get(
    '/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google'
    }),
    authController.authenticate
);

router.post('/logout', authController.logout);

export default router;
