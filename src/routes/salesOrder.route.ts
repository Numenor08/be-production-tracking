import express from 'express';
import SalesOrderController from '../controllers/salesOrder.controller';

const router = express.Router();

router.get('/', SalesOrderController.getSalesOrder);
router.post('/', SalesOrderController.createSalesOrder);

export default router;
