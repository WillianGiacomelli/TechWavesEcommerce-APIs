import { Router, Request, Response, NextFunction } from 'express';
import httpProxy from 'express-http-proxy';
import dotenv from 'dotenv';

dotenv.config();


const customerApiUrl = process.env.PRODUCT_API_URL ?? 'http://localhost:3003';
if (!customerApiUrl) {
  throw new Error('PRODUCT_API_URL is required');
}

const productRouter = Router();

const productServiceProxy = httpProxy(customerApiUrl, {
  timeout: 10000,
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    return proxyReqOpts;
  },
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    return proxyResData;
  },
  proxyErrorHandler: (err: any, res: Response, next: NextFunction) => {

    if (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
      res.status(504).json({
        success: false,
        error: 'Gateway Timeout',
        message: 'The product service is temporarily unavailable. Please try again later.',
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'An unexpected error occurred while communicating with the product service.',
      });
    }
  },
});

productRouter.get('/product', productServiceProxy);
productRouter.get('/product/category', productServiceProxy);
productRouter.post('/product', productServiceProxy);

productRouter.get('/product/health-check', productServiceProxy);

export default productRouter;