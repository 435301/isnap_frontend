import { useState, useEffect } from "react";

const useResponsiveSidebar = (breakpoint = 992) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return { windowWidth, isSidebarOpen, toggleSidebar };
};

export default useResponsiveSidebar;
