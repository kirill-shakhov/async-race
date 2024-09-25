import { RouteObject } from 'react-router-dom';

import GarageView from '../views/GarageView.tsx';

export default [
  {
    path: 'garage',
    element: <GarageView />,
  },
] as RouteObject[];
