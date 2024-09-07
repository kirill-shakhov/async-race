import WinnersView from '../views/WinnersView.tsx';

import { RouteObject } from 'react-router-dom';

export default [
  {
    path: 'winners',
    element: <WinnersView />,
  },
] as RouteObject[];
