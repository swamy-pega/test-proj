

function MessageSubMsg()
{

    return ( <h1>test message </h1>)
}

function MessageSubMsg2()
{

    return ( <h1>test message 2</h1>)
}

function ListofMessages()
{
return(
   <> 
   
   <div>
       <p><h1>hello test1 function</h1></p>
        <p><MessageSubMsg/></p>
        <p><MessageSubMsg2/></p>
    </div>
   </>
   
);

}
   
   
export default ListofMessages;