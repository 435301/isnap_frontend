import { useEffect, useState } from "react";

const useResponsiveSidebar = (breakpoint = 992) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsSidebarOpen(width >= breakpoint);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return {
    windowWidth,
    isSidebarOpen,
    setIsSidebarOpen,
  };
};

export default useResponsiveSidebar;
