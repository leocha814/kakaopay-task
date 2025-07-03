import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const SelectReceiveAccount = lazy(() => import('@/pages/SelectReceiveAccount'));

export const routeObjects: RouteObject[] = [
  {
    path: '/my-account',
    element: <SelectReceiveAccount />,
  },
  {
    path: 'not-found',
    element: <div>not fount</div>,
  },
  {
    path: '*',
    element: <Navigate to="/not-found" replace />,
  },
];
