import { useEffect, useState } from "react";
import "./ButtonUpper.css";
import NavigationIcon from "@mui/icons-material/Navigation";
export const ButtonUpper = () => {
  // eslint-disable-next-line no-unused-vars
  const [up, setUp] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setUp(true);
      } else {
        setUp(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {up && (
        <button onClick={scrollUp} className="button-up">
          <NavigationIcon sx={{ fontSize: 50 }} />
        </button>
      )}
    </div>
  );
};
