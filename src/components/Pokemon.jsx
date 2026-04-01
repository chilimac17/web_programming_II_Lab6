import React,{useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import {Card, CardContent, CardMedia, Typography, CardHeader} from "@mui/material";


const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/";


function Pokemon(props) {
    const { id } = useParams();
    const [pokemonSummary, setPokemonSummary] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("useEffect called with id:", id);
        const fetchData = async () => {
            try {
            const data = await axios.get(`${POKEMON_API_URL}${id}`);
            setPokemonSummary({ data: data.data });
            setLoading(false);
            console.log("Fetched Pokemon data:", data.data);
            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
             }
        };
        fetchData();
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    } else {
        return <div>
            
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader title={pokemonSummary.data.name} />
                <CardMedia component="img" height="140" image={pokemonSummary.data.sprites.front_default} alt={pokemonSummary.data.name} />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Height: {pokemonSummary.data.height} | Weight: {pokemonSummary.data.weight}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Types: {pokemonSummary.data.types.map(type => type.type.name).join(", ")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Abilities: {pokemonSummary.data.abilities.map(ability => ability.ability.name).join(", ")}
                    </Typography>
                    </CardContent>
            </Card>
        </div>
    }
}


export default Pokemon;