import { PrismaClient } from '../generated/prisma';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getSalesOrder = async (req: Request, res: Response) => {
  const salesOrders = await prisma.sales_Order.findMany();
  res.json(salesOrders);
};

const createSalesOrder = async (req: Request, res: Response) => {
  const created = await prisma.sales_Order.create({ data: req.body });
  res.status(201).json(created);
};

export default {
  getSalesOrder,
  createSalesOrder,
};
