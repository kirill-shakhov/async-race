import {createBrowserRouter, Navigate} from 'react-router-dom';
import modules from '@modules/index';
import AppLayout from "@/shared/layouts/AppLayout/AppLayout.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/garage" replace={true}/>,
      },
      ...modules.router]
  },
]);

export default router;
