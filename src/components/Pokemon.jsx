import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Chip, Stack, Grid, LinearProgress } from "@mui/material";
import NotFound from "./NotFound";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/";

function Pokemon() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setLoading(true);
        setNotFound(false);
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${POKEMON_API_URL}${id}`);
                setPokemon(data);
            } catch (error) {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (notFound) {
        return <NotFound />;
    } 

    if (loading) {
        return <div>Loading....</div>;
    }

    const extractId = (url) => url.split("/").filter(Boolean).pop();
    
    const image = pokemon.sprites.versions["generation-iv"].platinum.front_default || pokemon.sprites.other["official-artwork"].front_default;  
    //pokemon.sprites.other["official-artwork"].front_default;  
    //pokemon.sprites.front_shiny;   
    //pokemon.sprites.front_default;


    return (
        <div>

            {/* Header */}
            <Grid item xs={12} sm={4} container spacing={4} alignItems="flex-start">
                <Card>
                        <CardMedia
                            component="img"
                            image={image}
                            alt={pokemon.name}
                        />
                        <CardContent>
                            <Typography variant="h4" textTransform="capitalize" textAlign="center">
                                {pokemon.name}
                            </Typography>
                            <Typography variant="subtitle1" color="white" textAlign="center">
                                #{pokemon.id}
                            </Typography>
                        </CardContent>
                </Card>

                {/* Basic Info */}
                <Grid item xs={12} sm={8}>
                    <Typography variant="h5" gutterBottom>Basic Info</Typography>
                    <Typography><strong>Height:</strong> {pokemon.height / 10} m</Typography>
                    <Typography><strong>Weight:</strong> {pokemon.weight / 10} kg</Typography>
                    <Typography><strong>Base Experience:</strong> {pokemon.base_experience}</Typography>
                    <Typography>
                        <strong>Species:</strong>{" "}
                        <Typography component="span" textTransform="capitalize">
                            {pokemon.species.name}
                        </Typography>
                    </Typography>

                    <br />

                    {/* Types */}
                    <Typography variant="h6" gutterBottom>Types</Typography>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                        {pokemon.types.map(({ type }) => (
                            <Link
                                key={type.name}
                                to={`/types/${extractId(type.url)}`}
                                style={{
                                    textDecoration: "none",
                                    padding: "4px 12px",
                                    borderRadius: "16px",
                                    backgroundColor: "#e0e0e0",
                                    color: "#000",
                                    fontSize: "0.8125rem",
                                    textTransform: "capitalize",
                                    display: "inline-block"
                                }}
                            >
                                {type.name}
                            </Link>
                        ))}
                    </div>
                    
                    {/* Abilities */}
                    <Typography variant="h6" gutterBottom>Abilities</Typography>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {pokemon.abilities.map(({ ability, is_hidden }) => (
                            <Link
                                key={ability.name}
                                to={`/abilities/${extractId(ability.url)}`}
                                style={{
                                    textDecoration: "none",
                                    padding: "4px 12px",
                                    borderRadius: "16px",
                                    backgroundColor: is_hidden ? "transparent" : "#e0e0e0",
                                    color: is_hidden ? "#e0e0e0" : "#000",
                                    fontSize: "0.8125rem",
                                    textTransform: "capitalize",
                                    display: "inline-block",
                                    border: is_hidden ? "1px solid #e0e0e0" : "none"
                                }}
                            >
                                {`${ability.name}${is_hidden ? " (hidden)" : ""}`}
                            </Link>
                        ))}
                    </div>
                </Grid>
            </Grid>

            <br />

            <div>
                {/* Stats */}
            <Typography variant="h5" gutterBottom>Base Stats</Typography>
                {pokemon.stats.map(({ stat, base_stat }) => (
                    <div key={stat.name} mb={1}>
                        <div display="flex" justifyContent="space-between">
                            <Typography variant="body2" textTransform="capitalize">
                                {stat.name}
                            </Typography>
                            <Typography variant="body2">{base_stat}</Typography>
                        </div>
                        <LinearProgress
                            variant="determinate"
                            value={Math.min((base_stat / 255) * 100, 100)}
                            sx={{ height: 8, borderRadius: 4 }}
                        />
                    </div>
                ))}
            </div>
            <br />

            {/* Moves */}
            <Typography variant="h5" gutterBottom>Moves</Typography>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {pokemon.moves.slice(0, 20).map(({ move }) => (
                    <span
                        key={move.name}
                        style={{
                            padding: "2px 8px",
                            borderRadius: "16px",
                            backgroundColor: "#e0e0e0",
                            color: "#000",
                            fontSize: "0.75rem",
                            textTransform: "capitalize",
                            display: "inline-block"
                        }}
                    >
                        {move.name}
                    </span>
                ))}
                {pokemon.moves.length > 20 && (
                    <Typography variant="body2" color="white" alignSelf="center">
                        +{pokemon.moves.length - 20} more
                    </Typography>
                )}
            </div>

        </div>
    );
}

export default Pokemon;