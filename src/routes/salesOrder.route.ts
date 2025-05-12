import express from 'express';
import SalesOrderController from '../controllers/salesOrder.controller';

const router = express.Router();

router.get('/', SalesOrderController.getSalesOrders);
router.get('/:id', SalesOrderController.getSalesOrderById);
router.post('/', SalesOrderController.createSalesOrder);
router.put('/:id', SalesOrderController.updateSalesOrder);
router.delete('/:id', SalesOrderController.deleteSalesOrder);

export default router;
