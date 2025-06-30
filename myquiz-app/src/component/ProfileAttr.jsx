import { getImageUrl } from "./Utils";
export default function ProfileAttr( {person, size})
{

    return(
<img className='avatar'
src={getImageUrl(person)}
alt={person.name}
width={size}
heihgt={size}/>

    )

}


