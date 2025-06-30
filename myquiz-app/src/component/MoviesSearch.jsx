import { useEffect,useState } from "react";
//import { useNavigate } from "react-router-dom";//
//7e1413422
//import app.css from './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

//import NoImage from './assets/no-imagge.svg';

function MovieResults()
{
 
   const API_URL='http://www.omdbapi.com/?i=tt3896198&apikey=7e141342';

   const movie={
    "Title": "Italian Spiderman",
    "Year": "2007",
    "imdbID": "tt2705436",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYWNiMmNlNmQtZTI2MS00MzAxLTgxM2QtNDY3ZGQxNDMwZDgzXkEyXkFqcGc@._V1_SX300.jpg"
}

   const [searchTerm,setSearchTerm] =useState("");

   const [movies,setMovies]=useState([]);

   useEffect( ()=>{ searchMovies();},[]);

   //const searchion=
    const searchMovies= async (title) =>
       {
       // const response= await fetch(`$(API_URL) & s=$(title)');
       const response = await fetch(`${API_URL}&s=${title}`);
      // const response = await fetch('https://reactnative.dev/movies.json');
       const data= await response.json();
       console.log(data);

       setMovies(data.Search);

       }
  

return (
<>
<div className='app'>

<h1> Movie Land </h1>

<div className='search'>

    <input placeholder="search movie" value={searchTerm} onChange={ (e)=> setSearchTerm(e.target.value)}/>
    <img src={SearchIcon} alt='Search' onClick={() => searchMovies(searchTerm) }/>
</div>

{
movies?.length>0 ? 

(<div className='container'>
    {movies.map((movie) => (<MovieCard movie={movie}/>))}
    </div>
    
): 
( <div className='empty'> <h2> No Movies found</h2> </div>)

}

</div>

</>
);



};

export default  MovieResults;