import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/shared/components';

function AppLayout() {
  return (
    <div className="max-w-screen-xl min-h-screen mx-auto px-4 flex flex-col gap-8">
      <AppHeader />

      <Outlet />
    </div>
  );
}

export default AppLayout;
