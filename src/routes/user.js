import express from 'express';

const router = express.Router();

import * as userController from '../controllers/user';
import * as userMiddleware from '../middlewares/user';

// allow user routes to only be accessed by the same user
router.use(userMiddleware.authenticate);

router.get('/:userGoogleId/category', userController.getCustomCategories);
router.post('/:userGoogleId/category', userController.addCustomCategory);
router.put(
    '/:userGoogleId/category/:categoryId',
    userController.updateCustomCategory
);
router.delete(
    '/:userGoogleId/category/:categoryId',
    userController.deleteCustomCategory
);

router.get('/:userGoogleId/transaction', userController.getTransactions);
router.post('/:userGoogleId/transaction', userController.addTransaction);
router.delete(
    '/:userGoogleId/transaction/:transactionId',
    userController.deleteTransaction
);

export default router;
