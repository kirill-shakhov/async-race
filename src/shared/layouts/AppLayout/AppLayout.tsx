import AppHeader from "@/shared/components/AppHeader/AppHeader.tsx";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <AppHeader/>
      <Outlet/>
    </div>
  )
}


export default AppLayout;