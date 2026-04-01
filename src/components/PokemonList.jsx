import React, { useState, useEffect } from "react";
import { Grid, Card, CardActionArea, CardContent, CardMedia, CardHeader, Typography, CircularProgress, Box } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKEMON_COUNT = 20; // change this to however many you want

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const requests = Array.from({ length: POKEMON_COUNT }, (_, i) =>
                    axios.get(`${POKEMON_API_URL}${i + 1}`)
                );
                const results = await Promise.all(requests);
                setPokemonList(results.map(r => r.data));
            } catch (error) {
                console.error("Error fetching Pokemon list:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container spacing={2} padding={2}>
            {pokemonList.map(pokemon => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea component={Link} to={`/pokemon/${pokemon.id}`}>
                            <CardHeader title={pokemon.name} />
                            <CardMedia
                                component="img"
                                height="140"
                                image={pokemon.sprites.front_default}
                                alt={pokemon.name}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    Height: {pokemon.height} | Weight: {pokemon.weight}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Types: {pokemon.types.map(t => t.type.name).join(", ")}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default PokemonList;