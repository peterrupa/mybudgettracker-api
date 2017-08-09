import express from 'express';
const router = express.Router();

import authRoutes from './auth';
import categoryRoutes from './category';
import userRoutes from './user';

router.get('/', (req, res) => {
    res.send({
        message: 'Welcome to My Budget Tracker API server'
    });
});

router.use('/auth', authRoutes);
router.use('/category', categoryRoutes);
router.use('/user', userRoutes);

export default router;
