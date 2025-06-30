import React, { useState } from "react";

// Step 1: Define question type
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}


/*const quizData: Question[] = [
  {
    question: "X+12=14 What is the value of X ?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
  },
  {
    question: "11+Y=15, what is the value of Y ?",
    options: ["2", "4", "6", "8"],
    correctAnswer: "4",
  },
  {
    question: "2+Y=8, what is the value of Y ? " ,
    options: ["4", "6", "8", "10"],
    correctAnswer: "6",
  },
]; 
// Step 2: Sample quiz data
/*const quizData: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    correctAnswer: "Mars",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Tolstoy", "Hemingway", "Dickens"],
    correctAnswer: "Shakespeare",
  },
]; */

//yokshitha questions
const quizData: Question[] = [
  
]; 
const Quiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedButton, setSelectedButton] = useState(-1);
  //const [isSelected, setIsSelected] = useState(false);
  
  const currentQuestion = quizData[currentIndex];

  const handleAnswerClick = (option: string, idx :number) => {

   
    //const selectedOption='test';
    if (option === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
   
  //alert("button idx "+idx+"option=="+option+"Selected button "+selectedButton+"is seleted");
  setSelectedButton(idx);
  //alert(idx+option+selectedButton+isSelected);

  //alert("afeter seleted button idx update "+idx+" option "+option+" Selected button "+selectedButton+" is seleted ");
   
  console.log("button idx "+idx+" option "+option+" Selected button "+selectedButton+" is seleted "+" current index "+currentIndex);

   if (selectedButton === idx)
   {
    //setIsSelected(true);
    //alert(isSelected);
    }
   //console.log("setIsSelected "+isSelected);
   //console.log("option "+option);
   //console.log("setSelectedButton "+selectedButton);
   console.log("ibuutton dx "+idx+" option "+option+" Selected button "+selectedButton+" is seleted ");

  }
const resetQuiz=()=>
{
    //alert("test");
//const initialindex=0;
setCurrentIndex(0);
setShowScore(false);
setScore(0);
setSelectedButton(-1);

        console.log("resp"+setCurrentIndex(0));
    //const [currentIndex, setCurrentIndex] = useState(0);
}

const nextQuestion=() =>
{


    const nextIndex = currentIndex + 1;
    console.log('current index'+nextIndex);
    if (nextIndex < quizData.length) {
      setCurrentIndex(nextIndex);
      setSelectedButton(-1);
    } else {
      setShowScore(true);
    } 

}

const backQuestion=() =>
  {
  
  
      const nextIndex = currentIndex -1;
      //console.log('current index'+nextIndex);
      if (nextIndex < quizData.length) {
        setCurrentIndex(nextIndex);
        setSelectedButton(-1);
      } else {
        setShowScore(true);
      } 
  
  }
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h2>Quiz - Question number - {currentIndex +1} out of  {quizData.length} </h2>
      {showScore ? (
        <div> 
          <h3>Your Score: {score} / {quizData.length}</h3> 
          {score==quizData.length ? (<h3> Wow Good job !</h3>) :(<h3> Please try again !</h3>) } 
          <p><button  style={{ width: "25%",
                    padding: '10px 20px',
                    marginBottom: "10px",
                    cursor: 'pointer', borderRadius: "8px",
                    backgroundColor: "lightgoldenrodyellow",
                    } } onClick={()=> resetQuiz()}> start again </button></p>
        </div>
      ) : (
        <div>
          <h3>{currentQuestion.question}</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>

           {currentQuestion.options.map( (option, idx)=> 
            {
              
              const isSelected = selectedButton === idx;
              return(
              <li key={idx}>
                <button
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    //backgroundColor: "#f0f0f0",
                    backgroundColor: isSelected ? 'lightskyblue' : '#ccc',
                    //backgroundColor:{isSelected} ? 'lightskyblue' : 'lightgreen',
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAnswerClick(option,idx)}
                >
                  {option}
                </button>
              </li>)
})
            
          }
          </ul> 
          
           
          <p 
      
          style={{
            maxWidth: "700px",
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2px',
       // borderTop: '1px solid #eee',
        //position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        //backgroundColor: '#fff',
        zIndex: 1000,
      }}>


           <button disabled={currentIndex==0 }
           style={{ width: "25%",
                    padding: '10px 20px',
                    marginBottom: "10px",
                    cursor: 'pointer', borderRadius: "8px",
                    backgroundColor: "lightgoldenrodyellow",
                    } } onClick={() => backQuestion()}> Back </button>
          <button style={{ width: "25%",
                    padding: '10px 20px',
                    marginBottom: "10px",
                    cursor: 'pointer', borderRadius: "8px",backgroundColor: "lightgoldenrodyellow"}} onClick={() => nextQuestion()}> Next </button>
                    </p>
        </div>
      )}
      
    </div>
  );
};

export default Quiz;
