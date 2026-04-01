import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
    Box, Card, CardContent, CardMedia, Typography, Chip, Stack,
    Divider, Grid, LinearProgress
} from "@mui/material";
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

    if (notFound) return <NotFound />;
    if (loading) return <div>Loading....</div>

    const extractId = (url) => url.split("/").filter(Boolean).pop();
    
    const image =
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default;

    return (
        <div>

            {/* Header */}
            <Grid container spacing={4} alignItems="flex-start">
                <Grid item xs={12} sm={4}>
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
                </Grid>

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

                    <Divider sx={{ my: 2 }} />

                    {/* Types */}
                    <Typography variant="h6" gutterBottom>Types</Typography>
                    <Stack direction="row" gap={1} mb={2}>
                        {pokemon.types.map(({ type }) => (
                            <Chip
                                key={type.name}
                                label={type.name}
                                component={Link}
                                to={`/types/${extractId(type.url)}`}
                                clickable
                                sx={{ textTransform: "capitalize" }}
                            />
                        ))}
                    </Stack>

                    {/* Abilities */}
                    <Typography variant="h6" gutterBottom>Abilities</Typography>
                    <Stack direction="row" gap={1} flexWrap="wrap">
                        {pokemon.abilities.map(({ ability, is_hidden }) => (
                            <Chip
                                key={ability.name}
                                label={`${ability.name}${is_hidden ? " (hidden)" : ""}`}
                                component={Link}
                                to={`/abilities/${extractId(ability.url)}`}
                                clickable
                                variant={is_hidden ? "outlined" : "filled"}
                                sx={{ textTransform: "capitalize" }}
                            />
                        ))}
                    </Stack>
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            
            <div>
                {/* Stats */}
            <Typography variant="h5" gutterBottom>Base Stats</Typography>
                {pokemon.stats.map(({ stat, base_stat }) => (
                    <Box key={stat.name} mb={1}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2" textTransform="capitalize">
                                {stat.name}
                            </Typography>
                            <Typography variant="body2">{base_stat}</Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={Math.min((base_stat / 255) * 100, 100)}
                            sx={{ height: 8, borderRadius: 4 }}
                        />
                    </Box>
                ))}
            </div>

            <Divider sx={{ my: 3 }} />

            {/* Moves */}
            <Typography variant="h5" gutterBottom>Moves</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
                {pokemon.moves.slice(0, 20).map(({ move }) => (
                    <Chip
                        key={move.name}
                        label={move.name}
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                    />
                ))}
                {pokemon.moves.length > 20 && (
                    <Typography variant="body2" color="white" alignSelf="center">
                        +{pokemon.moves.length - 20} more
                    </Typography>
                )}
            </Stack>

        </div>
    );
}

export default Pokemon;