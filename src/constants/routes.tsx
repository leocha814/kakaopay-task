import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const Accounts = lazy(() => import('@/pages/Accounts'));
const Transfer = lazy(() => import('@/pages/transfer/Transfer'));

export const routeObjects: RouteObject[] = [
  {
    path: '/accounts',
    element: <Accounts />,
  },
  {
    path: '/transfer',
    element: <Transfer />,
  },

  {
    path: '/not-found',
    element: <div>not-found</div>,
  },
  {
    path: '/',
    element: <Navigate to="/accounts" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/not-found" replace />,
  },
];
