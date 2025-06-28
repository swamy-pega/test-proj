import ProfileAttr from "./ProfileAttr";

function Card({ children }) {
    return (
      <div className="card">
        {children}
      </div>
    );
  }


function PropsTest()

{

    return(

 //ProfileAttr size={100} person={{name:'test', imageId:'YfeOqp2'}}></ProfileAttr> 
<div> <Card>User Name <ProfileAttr size={300} person={{name:'test', imageId:'YfeOqp2'}}></ProfileAttr>  </Card></div>
         
    );


}


export default  PropsTest;
