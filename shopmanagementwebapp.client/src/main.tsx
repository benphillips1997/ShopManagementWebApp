import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createContext, redirect, RouterProvider, useRouteError } from 'react-router-dom';
import Dashboard from './pages/dashboard.tsx';
import Products from './pages/products.tsx';
import Login from './pages/login.tsx';
import Register from './pages/register.tsx';
import type { User } from './interfaces.tsx';
import AuthProvider, { useAuth } from './modules/authProvider.tsx';
import ErrorPage from './modules/errorPage.tsx';

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

// function authMiddlemare() {
//   const user = useAuth()?.user;

//   if (!user) {
//     throw redirect('/login');
//   }
// }

// function loader() {
//   let user = useAuth()?.user;
//   return user;
// }
