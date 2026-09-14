import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom';
import Dashboard from './pages/dashboard.tsx';
import Shop from './pages/shop.tsx';
import Login from './pages/login.tsx';
import Register from './pages/register.tsx';
import AuthProvider from './modules/authProvider.tsx';
import ErrorPage from './pages/errorPage.tsx';
import Orders from './pages/customer/orders.tsx';
import Order from './pages/customer/order.tsx';
import Checkout from './pages/customer/checkout.tsx';
import Payment from './pages/customer/payment.tsx';
import Settings from './pages/customer/settings.tsx';
import UserRoute from './pages/customer/userRoute.tsx';
import AdminRoute from './pages/admin/adminRoute.tsx';
import Users from './pages/admin/users.tsx';
import Reports from './pages/admin/reports.tsx';
import NotFound from './modules/notFound.tsx';
import User from './pages/admin/user.tsx';
import Products from './pages/admin/products.tsx';

const router = createBrowserRouter([
  { path: '/', ErrorBoundary: Error, Component: Dashboard },
  { path: '/shop', Component: Shop },
  { path: '/login', Component: Login },
  { path: '/register', Component: Register },
  { Component: UserRoute, children: [
      { path: '/orders', Component: Orders },
      { path: '/order/:orderId', Component: Order },
      { path: '/checkout', Component: Checkout },
      { path: '/payment', Component: Payment },
      { path: '/settings', Component: Settings },
      { Component: AdminRoute, children: [
        { path: '/users', Component: Users },
        { path: '/user/:userId', Component: User },
        { path: '/reports', Component: Reports },
        { path: '/products', Component: Products },
      ]}
    ]
  },
  { path: "*", Component: NotFound }
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