import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";
import styles from "./QRCarnet.module.css"; // Importa el módulo CSS

export default function QRCarnet() {
  const { dni } = useParams();

  return (
    <div className={styles.container}> 
      <div>
        <h1>Carnet Digital</h1>
      </div>
      <div>
        <QRCode
          value={`https://goclub.com.ar/sistema/webapp/socio/micarnetDgital/${dni}`}
          className={styles.qrcode}
        />
      </div>
      <div>
        <Link to={`/${localStorage.userId}/profile`}><button>Volver al perfil</button></Link>
      </div>
    </div>
  );
}
