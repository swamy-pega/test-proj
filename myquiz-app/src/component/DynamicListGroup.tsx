import { useState } from "react";

function DynamicListGroup()
{
 const vehicleList =['FORD','TOYOTA','HONDA'];
   //let selectedIndex=0;
const [selectedIndex, setSelectedIndex]= useState(-1);

    //vehicleList=[];
    const getMessage=()=>{ 
        return vehicleList.length == 0 ? <p> no results </p> : null }
        //vehicleList.length == 0 ? <p> no results </p> : null ;; }

    //vehicleList=[];

   // vehicleList.map(item => <l1>{item}</l1>);

   //const handleclick=(event:MouseEvent) => console.log(event);
return (
<>
<h1> dynamic List group</h1>
{getMessage}
<ul className="list-group">

{vehicleList.map((item,index) => ( <li className={ selectedIndex ==index ? 'list-group-item active' : 'list-group-iten'} key={item} 
onClick={()=>{setSelectedIndex(index);}}>{item} </li>) )}

</ul>

</>);



};
export default DynamicListGroup;