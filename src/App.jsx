import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Pokemon from "./components/Pokemon";
import PokemonList from "./components/PokemonList";
import Home from "./components/Home";
import Ability from "./components/Ability";
import AbilityList from "./components/AbilityList";
import Type from "./components/Type";
import TypeList from "./components/TypeList";
import NotFound from "./components/NotFound";
import { Routes, Link, Route } from "react-router-dom"; 
import './App.css'

function App() {
  
  /* Button impl
<Button color="inherit" component={Link} to="/">Home</Button>
<Button color="inherit" component={Link} to="/pokemon/page/1">Pokémon</Button>
<Button color="inherit" component={Link} to="/abilities/page/1">Abilities</Button>
<Button color="inherit" component={Link} to="/types/page/1">Types</Button>




         
  */
 
  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: "#f5a623" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokemon Explorer App 
          </Typography>          
          
      <Link to="/">Home</Link>
      <Link to="/pokemon/page/1">Pokemon ID</Link>
      <Link to="/abilities/page/1">Abilities</Link>
      <Link to="/types/page/1">Types</Link>

        </Toolbar>
      </AppBar>
     
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/pokemon/page/:page" element={<PokemonList />} />
         <Route path="/pokemon/:id" element={<Pokemon />} />
         <Route path="/abilities/page/:page" element={<AbilityList />} />
         <Route path="/abilities/:id" element={<Ability />} />
         <Route path="/types/page/:page" element={<TypeList />} />
         <Route path="/types/:id" element={<Type />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App
