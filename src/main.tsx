import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.scss';

import router from '@/router';
import {RouterProvider} from 'react-router-dom';

import {Provider} from "react-redux";
import {store} from "@/store";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>,
  </Provider>
);
