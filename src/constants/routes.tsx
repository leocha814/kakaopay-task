import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const ReceiveAccountSelect = lazy(() => import('@/pages/ReceiveAccountSelect'));
const SendMoney = lazy(() => import('@/pages/SendMoney/SendMoney'));

export const routeObjects: RouteObject[] = [
  {
    path: '/receive-account-select',
    element: <ReceiveAccountSelect />,
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
    path: '/',
    element: <Navigate to="/receive-account-select" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/not-found" replace />,
  },
];
