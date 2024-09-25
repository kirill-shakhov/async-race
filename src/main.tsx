import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';

import { RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '@/store';

import router from '@/router';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>,
);
