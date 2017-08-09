import express from 'express';
const router = express.Router();

import authRoutes from './auth';

router.get('/', (req, res) => {
    res.send({
        message: 'Welcome to My Budget Tracker API server'
    });
});

router.use('/auth', authRoutes);

export default router;
