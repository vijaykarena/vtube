import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Body = () => {
  return (
    <div className="flex h-[calc(100vh-6rem)] w-full">
      <Sidebar />
      <div className="flex-1 overflow-y-auto w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
