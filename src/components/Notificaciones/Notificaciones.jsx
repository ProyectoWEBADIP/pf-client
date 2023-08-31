import { useState } from "react";
import { IconButton  } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";

function Notificaciones() {
  const [dropdown, setDropdown] = useState(false);

  const openAndClose = () => {
    setDropdown(!dropdown);
  };

  const notifications = [
    { title: "Nueva notificación!", content: "Contenido de la notificación 1" },
    { title: "Nueva notificación!", content: "Contenido de la notificación 2" },
    { title: "Nueva notificación!", content: "Contenido de la notificación 3" },
    { title: "Nueva notificación!", content: "Contenido de la notificación 4" },
    { title: "Nueva notificación!", content: "Contenido de la notificación 5" },
    { title: "Nueva notificación!", content: "Contenido de la notificación 6" },
    { title: "Nueva notificación!", content: "Contenido de la notificación 7" },
  ];

  return (
    <div style={{ position: "relative" }}>
      <IconButton
        onClick={openAndClose}
        style={{ cursor: "pointer" }}
        aria-label="Notificaciones"
      >
        <NotificationsIcon />
      </IconButton>
      {dropdown && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            width: "200px", 
            maxWidth: "500%", 
            whiteSpace: "normal", 
            overflowY: 'scroll', 
            maxHeight: '300px'
          }}
        >
          
          <ul>
            {notifications.map((noti, i) => (
              <li key={i}>
                <hr /><h4 style={{fontWeight: "bold"}}>{noti.title}</h4> 
                <p style={{ fontStyle: 'oblique' }}>{noti.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notificaciones;