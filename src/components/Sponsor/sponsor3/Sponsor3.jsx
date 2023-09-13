import { useSelector,useDispatch } from 'react-redux';
import { getAllSponsor } from '../../../redux/sponsorActions/sponsorActions';
import { useEffect } from 'react';
import './sponsor3.css';


const Sponsor3 = () => {
    const dispatch=useDispatch();
    const sponsor = useSelector((state)=>state.sponsor);
    console.log(sponsor);

    const location3 = sponsor.filter(objeto => objeto.location === 3);
    console.log(location3);

    useEffect(()=>{
        dispatch(getAllSponsor())
    },[dispatch])
  return (
    <div className='box'>
     
        
    {location3?.map((el)=>{
      return(
      
        <img className='img' key={el.id} src={el.image} alt="imagen" />
     
      )
    })}
 
</div>
  )
}

export default Sponsor3;