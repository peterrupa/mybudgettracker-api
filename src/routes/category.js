import express from 'express';

const router = express.Router();

import * as categoryController from '../controllers/category';

router.get('/', categoryController.getDefaultCategories);

export default router;
