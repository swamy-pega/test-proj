import React, {  useState } from "react";

// Step 1: Define question type


interface QuestionList {
  id: number;
  question_text: string;
  question_type: string;
  topic: string;
  difficulty: string;
  answers: string[];
  explanation: string;
  anwer_text: string;
}

interface AnswersList {     

    id: number;
    question_id: number;
    answer_id: number;
    answer_text: string;
    is_correct: boolean;
    
  }

interface QuestionAPIResponse {
    questions: QuestionList[];
    question_text: string;
    question_type: string;
    topic: string;
    difficulty: string;
    answers: AnswersList[];
   anwer_text: string;
    is_correct: boolean;
    question_id: number;
    answer_id: number;

    explanation: string;
  
  }

  //smaple respons frm api
  /*{
    "question_text": "10+5=?",
    "question_type": "mcq1",
    "answers": [
    {"answer_text": "10", "is_correct": false},
    {"answer_text": "11", "is_correct": false},
    {"answer_text": "12", "is_correct": false},
    {"answer_text": "15", "is_correct": true}
    ],
    "explanation": "10 plus 5 equals 15",
    "difficulty": "easy",
    "is_active": true,
    "topic": "maths",
    "level": 1,
    "created_by":"admin"
} */
//yokshitha questions

const Quiz: React.FC = () => {

      
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedButton, setSelectedButton] = useState(-1);
  const[quizQuestions, setQuizQuestions] = useState<QuestionAPIResponse[]>([]);
  const[topic, setTopic] = useState('')
  //const [topic, setTopic] = useState('math');
  const[level, setLevel] = useState(0);



 const handleChangelevel = async (event: React.ChangeEvent<HTMLSelectElement>) => {

//alert("handleChangelevel called with value: " + value);
const level = event.target.value;
//alert("handleChangelevel called with value: " + level+" topic: " + topic);
    //setSelectedTopic(topic);
    setLevel(parseInt(level));

    console.log('Selected level:', level);

    const baseURL = import.meta.env.VITE_API_URL;
    const quizapiprefix = import.meta.env.VITE_API_QUIZ_PREFIX;
 console.log('API URL:', baseURL);

    //const response = await fetch(`${API_URL}&s=${title}`);
    const api_url = `${baseURL}/${quizapiprefix}/${level}/${topic}`;

    //alert("API URL: " + api_url);

    
           //alert("getQuestions called with topic: " + topic + " and level: " + level);
           console.log('Fetching questions for topic:', topic, 'and level:', level);
           try {
            setQuizQuestions([]);
            
            console.log('Fetching questions from API:', api_url);
               const response = await fetch(api_url);
               
               if (!response.ok) {
                 // If response status is not in 200–299
                 throw new Error(`HTTP error! Status: ${response.status}`);
               }
         
               const result = await response.json();   
               // Assuming the API returns an object with a 'data' property containing the questions
               //console.log('Fetched data:', result.data);
               //setQuestions(result.data);
               //console.log('Fetched questions:', result);
               setQuizQuestions(result.questions);
               //console.log('Quiz questions set:', quizQuestions);
               // For debugging, you can log the fetched data
           
            //const currentQuestionAPI = quizQuestions[currentIndex];
               //console.log('Fetched data:', result);
               //setData(result.data);
             } 
             catch (err) {
               console.error('Error fetching data:', err);
               //setError(err.message || 'Unknown error');
             } 
         
         }
        


/* useEffect(() => {
   // Fetch questions when the component mounts
   handleChangelevel();

 },[topic,level]); // Re-fetch when topic or level changes
  //console.log('quizQuestions:', quizQuestions);*/



  //console.log('quizQuestionsLength:', quizQuestionsLength);

  const handleAnswerClick = (option: boolean, idx :number) => {

   
    //const selectedOption='test';
    if (option === true) {  
      setScore(prev => prev + 1);
      //console.log("Correct answer selected");
    }
   else {
      //console.log("Incorrect answer selected");
    }
  //alert("button idx "+idx+"option=="+option+"Selected button "+selectedButton+"is seleted");
  setSelectedButton(idx);
  //alert(idx+option+selectedButton+isSelected);

  //alert("afeter seleted button idx update "+idx+" option "+option+" Selected button "+selectedButton+" is seleted ");
   
  //console.log("button idx "+idx+" option "+option+" Selected button "+selectedButton+" is seleted "+" current index "+currentIndex);

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
setQuizQuestions([]);
setTopic('');
setLevel(0);
       // console.log("resp"+setCurrentIndex(0));
    //const [currentIndex, setCurrentIndex] = useState(0);
}

const nextQuestion=() =>
{


    const nextIndex = currentIndex + 1;
    console.log('current index'+nextIndex);
    if (nextIndex < quizQuestions.length) {
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
      if (nextIndex < quizQuestions.length) {
        setCurrentIndex(nextIndex);
        setSelectedButton(-1);
      } else {
        setShowScore(true);
      } 
  
  }
  return (

  
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>


        <h1>Quiz Questions</h1>
        <p className='my-paragraph'> Test paragraph</p>
        <p className='my-paragraph'> Topic: 
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">Select Topic</option>
            <option value="maths">Math</option>
            <option value="science">Science</option>
            <option value="history">History</option>
          </select>
          </p>
          <p>level:
            <select value={level} onChange={(e) => handleChangelevel(e)}>
                <option value="0">Select Level</option>
                <option value="1">Easy</option>
                <option value="2">Medium</option>
                <option value="3">Hard</option>
                </select>
          </p>

          {quizQuestions ?
        (
          currentIndex < quizQuestions.length &&
          quizQuestions[currentIndex] && !showScore
           ?
          (
            <div> 

            <h2>Quiz - Question number - {currentIndex +1} out of  {quizQuestions.length} </h2>
           
            <p><strong>Question : {quizQuestions[currentIndex].question_text}</strong></p>
            <ul style={{ listStyle: "none", padding: 0 }}>     

            {quizQuestions[currentIndex].answers.map((answer, index) => 
            {
            const isSelected = selectedButton === index;
              return (
              <li key={answer.id}> 
                <button
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: isSelected ? 'lightskyblue' : '#ccc',
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAnswerClick(answer.is_correct, index)}
                >
                  {answer.answer_text}
                </button>
              </li>)
            })}
            </ul>
            
           <div className="itmes-center" style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2px',
            //borderTop: '1px solid #eee',
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
                    </div>

        </div>)
            :
            showScore && <div> 
            <h3>Your Score: {score} / {quizQuestions.length}</h3> 
            {score==quizQuestions.length ? (<h3> Wow Good job !</h3>) :(<h3> Please try again !</h3>) } 
            <p><button  style={{ width: "25%",
                      padding: '10px 20px',
                      marginBottom: "10px",
                      cursor: 'pointer', borderRadius: "8px",
                      backgroundColor: "lightgoldenrodyellow",
                      } } onClick={()=> resetQuiz()}> start again </button></p>
          </div>
        
        ) :   
        
        <div><h2>Sorry, No Questions available...</h2> </div>

      } 

      
    </div>
  );
};

export default Quiz;
