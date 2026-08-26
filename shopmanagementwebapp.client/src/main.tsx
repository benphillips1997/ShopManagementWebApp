import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom';
import Dashboard from './pages/dashboard.tsx';
import Products from './pages/products.tsx';
import Login from './pages/login.tsx';
import Register from './pages/register.tsx';
import AuthProvider from './modules/authProvider.tsx';
import ErrorPage from './modules/errorPage.tsx';
import Orders from './pages/orders.tsx';
import Order from './pages/order.tsx';
import Checkout from './pages/checkout.tsx';
import Payment from './pages/payment.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    // loader: loader,
    ErrorBoundary: Error,
    Component: Dashboard
  },
  {
    path: '/products',
    // loader: loader,
    Component: Products
  },
  { 
    path: '/login', 
    Component: Login 
  },
  { 
    path: '/register', 
    Component: Register 
  },
  {
    path: '/orders',
    Component: Orders,
    children: [
      {
        path: ':orderId',
        Component: Order
      }
    ]
  },
  {
    path: '/checkout',
    Component: Checkout
  },
  {
    path: '/payment',
    Component: Payment
  }
]);

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

function Error() {
  let error = useRouteError();
  return <ErrorPage error={error} />
}