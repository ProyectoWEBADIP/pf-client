import { useSelector,useDispatch, } from "react-redux";
import { getAllSponsor } from "../../../redux/sponsorActions/sponsorActions";
import { useEffect } from "react";
import './sponsor2.css';


const Sponsor2 = () => {
    const dispatch=useDispatch();
    const sponsor=useSelector((state)=>state.sponsor)
    

    const location2= sponsor.filter(el=> el.location>=6 && el.location<=10)
    const inOrder=location2.sort((a,b)=>a.location-b.location)
    
    useEffect(()=>{
        dispatch(getAllSponsor())
    },[dispatch])
  return (
    <div className="cont_sponsor2">
        
        {inOrder?.map((el)=>{
            return(
                <img className='img_sponsor2_' key={el.id} src={el.image} alt="img" />
            )
        })}


    </div>
  )
}

export default Sponsor2;