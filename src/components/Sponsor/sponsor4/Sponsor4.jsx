import { useSelector,useDispatch } from 'react-redux';
import { getAllSponsor } from '../../../redux/sponsorActions/sponsorActions';
import { useEffect } from 'react';
import './sponsor4.css';

const Sponsor4 = () => {

    const dispatch=useDispatch();
    const sponsor = useSelector((state)=>state.sponsor);
    
    

    useEffect(()=>{
        dispatch(getAllSponsor())
    },[dispatch])

    const location4 = sponsor.filter(objeto => objeto.location >=16 && objeto.location<=20);
    const inOrder=location4.sort((a,b)=>a.location - b.location)

  return (
    <div className='cont_sponsor4_'>
    
       
   {inOrder?.map((el)=>{
     return(
     
       <img className='img_sponsor4_' key={el.id} src={el.image} alt="imagen" />
    
     )
   })}

</div>
  )
}

export default Sponsor4