import { RouteObject } from 'react-router-dom';

import WinnersView from '../views/WinnersView.tsx';

export default [
  {
    path: 'winners',
    element: <WinnersView />,
  },
] as RouteObject[];
