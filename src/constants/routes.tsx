import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const MyAccount = lazy(() => import('@/pages/MyAccount'));
const SendMoney = lazy(() => import('@/pages/SendMoney'));

export const routeObjects: RouteObject[] = [
  {
    path: '/my-account',
    element: <MyAccount />,
  },
  {
    path: '/send-money',
    element: <SendMoney />,
  },
  {
    path: '/not-found',
    element: <div>not-found</div>,
  },
  {
    path: '*',
    element: <Navigate to="/not-found" replace />,
  },
];
