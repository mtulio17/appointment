import { Router } from 'express';

const router = Router();
import { getCategories } from '../controllers/category.controller.js';

router.get('/categories', getCategories);

export default router;
