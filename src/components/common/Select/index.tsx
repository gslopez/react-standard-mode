import React, { useState, useCallback, useEffect } from "react";
import { Button } from "../Button";
import "./styles.css";

export function Select({
  icon,
  label,
  children: childrenOptions
}: {
  icon?: string;
  label?: string;
  children;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  });

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="Select">
      <Button icon={icon} label={label} onClick={toggleMenu} />
      {isOpen && <div className="expanded-menu">{childrenOptions}</div>}
    </div>
  );
}

// Select.propTypes = {
//   children: function (props, propName, componentName) {
//     const prop = props[propName];

//     let error = null;
//     React.Children.forEach(prop, function (child) {
//       if (child.type !== Button) {
//         error = new Error(
//           "`" + componentName + "` children should be of type `Button`."
//         );
//       }
//     });
//     return error;
//   }
// };
