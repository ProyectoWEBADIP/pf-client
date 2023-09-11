import { useSelector,useDispatch } from 'react-redux';
import { getAllSponsor } from '../../../redux/sponsorActions/sponsorActions';
import { useEffect } from 'react';

const Sponsor4 = () => {

    const dispatch=useDispatch();
    const sponsor = useSelector((state)=>state.sponsor);
    console.log(sponsor);

    useEffect(()=>{
        dispatch(getAllSponsor())
    },[dispatch])

    const location4 = sponsor.filter(objeto => objeto.location === 4);
    console.log(location4);

  return (
    <div className='box'>
    
       
   {location4?.map((el)=>{
     return(
     
       <img className='img' key={el.id} src={el.image} alt="imagen" />
    
     )
   })}

</div>
  )
}

export default Sponsor4