import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../utils/store";

const SidebarItem = ({ icon, text, to }: { icon: React.ReactNode; text: string; to?: string }) => {
  const content = (
    <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg">
      <span className="mr-5 text-gray-800">{icon}</span>
      <span className="text-[14px]">{text}</span>
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : content;
};

const Sidebar = () => {
  const isMenuOpen = useSelector((store: RootState) => store.app.isMenuOpen);

  if (!isMenuOpen) return null;

  return (
    <div className="w-56 p-3 h-[calc(100vh-4rem)] overflow-y-auto bg-white flex-shrink-0 hidden sm:block">
      <div className="border-b pb-3 mb-3">
        <SidebarItem
          to="/"
          icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 4.43542L19.5 10.59V19.5H15V14.5H9V19.5H4.5V10.59L12 4.43542ZM12 2.09961L1 11.1496H3.5V21H10.5V16H13.5V21H20.5V11.1496H23L12 2.09961Z" /></svg>}
          text="Home"
        />
        <SidebarItem
          icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M10 14.65V9.35L15 12L10 14.65ZM17.77 10.32L16.06 9.38L17.77 8.44C19.16 7.67 19.66 5.86 18.89 4.47C18.12 3.08 16.31 2.58 14.92 3.35L5.42 8.57C4.19 9.25 3.51 10.63 3.69 12.04C3.87 13.45 4.87 14.59 6.23 15.03L7.94 15.6L6.23 16.54C4.84 17.31 4.34 19.12 5.11 20.51C5.88 21.9 7.69 22.4 9.08 21.63L18.58 16.41C19.81 15.73 20.49 14.35 20.31 12.94C20.13 11.53 19.13 10.39 17.77 9.95V10.32Z" /></svg>}
          text="Shorts"
        />
        <SidebarItem
          icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M20 7H4V6H20V7ZM22 10V19H2V10H22ZM16 14.5L10 11V18L16 14.5ZM18 4H6V3H18V4Z" /></svg>}
          text="Subscriptions"
        />
      </div>

      <div className="border-b pb-3 mb-3">
        <h3 className="font-bold px-4 pt-1 pb-2">Explore</h3>
        <SidebarItem
          icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" /><path d="M13.5 12C13.5 12.83 12.83 13.5 12 13.5C11.17 13.5 10.5 12.83 10.5 12C10.5 11.17 11.17 10.5 12 10.5C12.83 10.5 13.5 11.17 13.5 12Z" /></svg>}
          text="Trending"
        />
        <SidebarItem
          icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 3L4 9V21H20V9L12 3ZM12 5.8L18 10.3V19H6V10.3L12 5.8Z" /></svg>}
          text="Music"
        />
        <SidebarItem
          icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M20 6H4V4H20V6ZM20 14H4V12H20V14ZM20 20H4V18H20V20Z" /></svg>}
          text="Movies"
        />
        <SidebarItem
          icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M20 7H4V6H20V7ZM22 10V19H2V10H22ZM16 14.5L10 11V18L16 14.5ZM18 4H6V3H18V4Z" /></svg>}
          text="Gaming"
        />
      </div>

      <div className="border-b pb-3 mb-3">
        <h3 className="font-bold px-4 pt-1 pb-2">You &gt;</h3>
        <SidebarItem
          icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M14.97 16.95L10 13.87V7H11.5V13.04L15.69 15.65L14.97 16.95ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" /></svg>}
          text="History"
        />
      </div>
    </div>
  );
};

export default Sidebar;
