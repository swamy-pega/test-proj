import React, { useState } from 'react';

//const buttonsList () => {"Earth", "Venus", "Mars", "Jupiter"};
interface buttonsType {
    name: string;
    id: number;
  }
  
  const buttonsList: buttonsType[] = [
{name: "East",
id:0},
{name: "west",
    id:1},
    {name: "south",
        id:2},
        {name: "north",
            id:3}
              
  ]

function SingleSelectButtons() {

  const [selectedButton, setSelectedButton] = useState(-1);
  //const [isSelected, setIsSelected] = useState(false);
  const handleClick = (id:number) => {

    alert("button idx"+id);

    console.log(" Button selected index "+id);
    setSelectedButton(id);

   //setIsSelected(true);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {buttonsList.map((items) => {

        const isSelected = selectedButton === items.id;
        console.log("seleted"+isSelected+selectedButton+items.id);
        return (
          <button
            key={items.id}
            onClick={() => handleClick(items.id)}
            style={{
              padding: '10px 20px',
              backgroundColor: isSelected ? 'dodgerblue' : '#ccc',
              color: isSelected ? 'white' : 'black',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {items.name} 
          </button>
        );
      })}
    </div>
  );
}

export default SingleSelectButtons;
