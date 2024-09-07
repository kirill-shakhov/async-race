import GarageView from '../views/GarageView.tsx';

import { RouteObject } from 'react-router-dom';

export default [
  {
    path: 'garage',
    element: <GarageView />,
  },
] as RouteObject[];
