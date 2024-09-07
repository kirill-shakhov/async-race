import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App.tsx';
import modules from '@modules/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="garage" replace />,
  },
  ...modules.router,
]);

export default router;
