export interface SalesOrderInput {
    product_name: string;
    product_qty: number;
    price: number;
    customer_name: string;
    finish_date: Date | string;
    delivery_date: Date | string;
  }