import { forbidden } from '../constants/errorTypes';

export const authenticate = (req, res, next) => {
    const { userGoogleId } = req.params;

    if (req.user && req.user.userGoogleId === userGoogleId) {
        next();
    } else {
        next(forbidden);
    }
};
