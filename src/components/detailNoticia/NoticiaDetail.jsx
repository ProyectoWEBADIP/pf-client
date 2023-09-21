/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getHistory } from "../../redux/login-registerActions/loginActions";
import {
  cleanNoticiaDetail,
  getNoticiaDetail,
} from "../../redux/noticiasActions/noticiasActions";
import Sponsor3 from "../Sponsor/sponsor3/Sponsor3";
import { getAllSponsor } from "../../redux/sponsorActions/sponsorActions";
import Sponsor4 from "../Sponsor/sponsor4/Sponsor4";
import "./detailNoticia.css";
import { setIsLoading } from "../../utils/setIsLoading";
export default function NoticiaDetail() {
  //!HOOKS
  const { id } = useParams();
  const dispatch = useDispatch();
  //!HOOKS
  useEffect(() => {
    dispatch(setIsLoading())
    dispatch(getNoticiaDetail(id));
    dispatch(getAllSponsor());
    
    return () => {
      dispatch(cleanNoticiaDetail());
    };
  }, [dispatch]);
  const isLoading = useSelector((state) => state.isLoading);
  const detalleNoticia = useSelector((state) => state.detalleNoticia);

  return (
    <div className="yourFatherConteiner">
      {isLoading ? (
          <span className="loader-notice"></span>
      ) : (
        <div className="NoticiaDetailContainer">
          <div className="izq_sponsor_Detail">
            <Sponsor3 />
          </div>
          <div className="noticiaContainer">
            <div className="detalisDescripcion">
              <h1>{detalleNoticia?.title}</h1>

              <p>{detalleNoticia?.resume}</p>
              <p>
                {
                  (
                    detalleNoticia.date?.split("T")[0] +
                    " a las " +
                    detalleNoticia.date?.split("T")[1]
                  ).split(".")[0]
                }
              </p>
              <img src={detalleNoticia?.image} alt={detalleNoticia?.image} />
              <p>{detalleNoticia?.content}</p>
            </div>
          </div>
          <div className="der_sponsor_detail">
            <Sponsor4 />
          </div>
        </div>
      )}
    </div>
  );
}
