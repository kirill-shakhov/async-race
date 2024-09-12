import AppHeader from "@/shared/components/AppHeader/AppHeader.tsx";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
  return (
    <div class="max-w-screen-xl min-h-screen mx-auto px-4 flex flex-col gap-8">
      <AppHeader/>
      <Outlet/>
    </div>
  )
}


export default AppLayout;