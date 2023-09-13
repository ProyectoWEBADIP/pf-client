import { useSelector,useDispatch } from 'react-redux';
import { getAllSponsor } from '../../../redux/sponsorActions/sponsorActions';
import { useEffect } from 'react';
import './sponsor1.css';

const Sponsor1 = () => {
    const dispatch=useDispatch();
    
    const sponsor = useSelector((state)=>state.sponsor);
    
    useEffect(()=>{
        dispatch(getAllSponsor())
    },[dispatch])
    
    const location1 = sponsor.filter(objeto => objeto.location === 1);
   
  return (
    <div className='box'>
     
        
        {location1?.map((el)=>{
          return(
          
            <img className='img' key={el.id} src={el.image} alt="imagen" />
         
          )
        })}     
    </div>
  )
}

export default Sponsor1;