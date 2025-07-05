import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const MyAccount = lazy(() => import('@/pages/MyAccount'));

export const routeObjects: RouteObject[] = [
  {
    path: '/my-account',
    element: <MyAccount />,
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
