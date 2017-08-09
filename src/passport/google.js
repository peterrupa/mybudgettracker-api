import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import GOOGLE_AUTH from '../config/auth';
import { User } from '../models';

export const strategy = new GoogleStrategy(
    {
        clientID: GOOGLE_AUTH.CLIENT_ID,
        clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/auth/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        const googleId = profile.id;
        const name = `${profile.name.givenName} ${profile.name.familyName}`;
        const photo = profile.photos[0].value;

        User.upsert({ googleId, name, photo })
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err);
            });
    }
);

export function serialize(user, done) {
    done(null, user.googleId);
}

export function deserialize(googleId, done) {
    User.findOne({
        where: { googleId }
    }).then(user => {
        if (user === null) {
            done(new Error('No user with given googleId.'));
        }

        done(null, user);
    });
}

export function init() {
    passport.use(strategy);
    passport.serializeUser(serialize);
    passport.deserializeUser(deserialize);
}

export default {
    init
};
