import { useSelector,useDispatch } from 'react-redux';
import { getAllSponsor } from '../../../redux/sponsorActions/sponsorActions';
import { useEffect } from 'react';
import './sponsor3.css';


const Sponsor3 = () => {
    const dispatch=useDispatch();
    const sponsor = useSelector((state)=>state.sponsor);
    

    const location3 = sponsor.filter(objeto => objeto.location>=11 && objeto.location<=15);
    const inOrder= location3.sort((a,b)=>a.location-b.location)
   

    useEffect(()=>{
        dispatch(getAllSponsor())
    },[dispatch])
  return (
    <div className='cont_sponsor3_'>
     
        
    {inOrder?.map((el)=>{
      return(
      
        <img className='img_sponsor3_' key={el.id} src={el.image} alt="imagen" />
     
      )
    })}
 
</div>
  )
}

export default Sponsor3;