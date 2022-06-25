import React, { useState } from "react";
import { createContext } from "react";
export const NotificationContext = createContext();
let timeOutId;
function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  const [classes, setClasses] = useState();
  const updateNotification = (type, value) => {
    if (timeOutId) clearTimeout(timeOutId);
    switch (type) {
      case "error":
        setClasses("bg-red-500");
        break;
      case "success":
        setClasses("bg-green-500");
        break;
      case "warning":
        setClasses("bg-orange-500");
        break;
      default:
        setClasses("bg-red-500");
    }
    setNotification(value);
    timeOutId = setTimeout(() => {
      setNotification("");
    }, 3000);
  };
  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className="fixed left-1/2 top-16 px-4 -translate-x-1/2 py-2 ">
          <div
            className={
              classes + " bounce-custom rounded shadow-md shadow-gray-50"
            }
          >
            <p className="text-white font-semibold">{notification}</p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
