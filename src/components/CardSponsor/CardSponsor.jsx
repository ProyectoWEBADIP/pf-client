import { useSelector} from 'react-redux';


const CardSponsor = () => {
    const sponsor = useSelector((state)=>state.sponsor);
    console.log(sponsor);
  return (
    <div>CardSponsor
        <div>
            <h1>cardSponsor</h1>       
        </div>

    </div>
  )
}

export default CardSponsor;