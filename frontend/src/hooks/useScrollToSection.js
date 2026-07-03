import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const report = params.get("report");
    if (!report) return;

    // Small delay to ensure the DOM is rendered and layout has settled
    const timer = setTimeout(() => {
      const element = document.getElementById(report);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("pulse-highlight");
        
        const cleanupTimer = setTimeout(() => {
          element.classList.remove("pulse-highlight");
        }, 2200);

        return () => clearTimeout(cleanupTimer);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [location.search, location.pathname]);
}
