import { Router, Request, Response, NextFunction } from 'express';
import httpProxy from 'express-http-proxy';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

// Configurar logger

// Verificar se CUSTOMER_API_URL está definida
const customerApiUrl = process.env.CUSTOMER_API_URL;
if (!customerApiUrl) {
  logger.error('CUSTOMER_API_URL is not defined in environment variables');
  throw new Error('CUSTOMER_API_URL is required');
}

const customerRouter = Router();

// Configurar proxy
const customerServiceProxy = httpProxy(customerApiUrl, {
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
        message: 'The customer service is temporarily unavailable. Please try again later.',
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'An unexpected error occurred while communicating with the customer service.',
      });
    }
  },
});

// Rotas
customerRouter.get('/customer', customerServiceProxy);
customerRouter.post('/customer', customerServiceProxy);

export default customerRouter;