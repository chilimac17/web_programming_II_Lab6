import Pokemon from "./components/Pokemon";
import PokemonList from "./components/PokemonList";
//import PokemonData from "./data/pokemonData";
import Home from "./components/Home";
import { Routes, Link, Route } from "react-router-dom"; 
import './App.css'

function App() {
  
     //        <Route path="/pokemon/:id" element={<Pokemon />} />

    // <Route path="/pokemonList" element={<PokemonList />} />
    //    <Route path="/abilities/" element={<Abilities />} />
    //    <Route path="/types/" element={<Types />} />
  return (
    <div>
      <h1>Pokemon App JSX</h1>
      <Link to="/">Home</Link>
      <br />
      <Link to="/pokemon/">Pokemon ID</Link>
       <br />
      <Link to="/pokemonList">Pokemon</Link>
       <br />
      <Link to="/abilities/">Abilities </Link>
       <br />
      <Link to="/types/">Types </Link>
      
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
        { <Route path="/pokemonList" element={<PokemonList />} /> }
        {/* <Route path="/abilities/" element={<Abilities />} /> */}
        {/* <Route path="/types/" element={<Types />} /> */}
      </Routes>
    </div>
  )
}

export default App
