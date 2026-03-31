import Pokemon from "./components/Pokemon";
//import PokemonList from "./components/PokemonList";
//import PokemonData from "./data/pokemonData";
import Home from "./components/Home";
import { Routes, Link, Route } from "react-router-dom"; 
import './App.css'

function App() {
  //<Link to="/pokemon/1">Pokemon</Link>
     // <Link to="/pokemonList">Pokemon List</Link>
     //        <Route path="/pokemon/:id" element={<Pokemon />} />


  return (
    <div>
      <h1>Pokemon App JSX</h1>
      <Link to="/">Home</Link>
      <br />
      <Link to="/pokemon/">Pokemon ID Brows</Link>
      
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
      </Routes>
    </div>
  )
}

export default App
