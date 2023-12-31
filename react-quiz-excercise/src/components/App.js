
 import { useEffect, useReducer } from "react";
import Header from "./Header"
import Main from "./Main";
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen";
import Question from './Question';

const initialstate={
  questions:[],
  status:'Loading',
  index:0
}

function reducer(state,action){
  switch(action.type){
    case 'dataReceived':
      return{...state,questions:action.payload,status:'ready'}
    case 'dataFailed':
      return {
        ...state,status:'error'
      }
    case 'start':
      return{
        ...state,status:'active'
      }
    default:
      throw new Error("Unknown Error")


  }
}
function App() {
const [{questions, status,index},dispatch]=useReducer(reducer,initialstate)
const numOfQuestions=questions.length
  useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then((res)=>res.json())
    .then((data)=>dispatch({type:'dataReceived',payload:data}))
    .catch((error)=>dispatch({type:'dataFailed'}))

  },[])
  return (
   <div className="app">
    <Header/>
    <Main >
      

      {status==='Loading' && <Loader/>}
      {status==='error' && <Error/>}
      {status==='ready' && <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch}/>}
      {status==='active' &&<Question question={questions[index]}/>}

    </Main>
   
   </div>
  );
}

export default App;
