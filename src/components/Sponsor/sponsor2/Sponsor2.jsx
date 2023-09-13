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
    <div className="contt">
        
        {inOrder?.map((el)=>{
            return(
                <img className='imgg' key={el.id} src={el.image} alt="img" />
            )
        })}


    </div>
  )
}

export default Sponsor2;