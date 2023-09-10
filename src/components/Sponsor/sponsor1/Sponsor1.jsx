import { useSelector,useDispatch } from 'react-redux';
import { getAllSponsor } from '../../../redux/sponsorActions/sponsorActions';
import { useEffect } from 'react';

const Sponsor1 = () => {
    const dispatch=useDispatch();
    
    const sponsor = useSelector((state)=>state.sponsor);
    
    console.log(sponsor,"estado");
    
    useEffect(()=>{
        dispatch(getAllSponsor())
    },[dispatch])
    
    const categoria1 = sponsor.filter(objeto => objeto.location === 1);
    console.log(categoria1);
   
  return (
    <div>Sponsor1</div>
  )
}

export default Sponsor1;