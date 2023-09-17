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
    
    const locationHome = sponsor.filter(objeto => objeto.location >= 1 && objeto.location <=5);
    const inOrder= locationHome.sort((a, b) => a.location - b.location); 
    console.log(inOrder);
    
   
  return (
    <div className='box'>
     
        
        {inOrder?.map((el)=>{
          return(
          
            <img className='img' key={el.id} src={el.image} alt="imagen" />
         
          )
        })}     
    </div>
  )
}

export default Sponsor1;