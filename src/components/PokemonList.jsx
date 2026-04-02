import React, { useState, useEffect } from "react";
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography, CircularProgress, Box } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import NotFound from "./NotFound";

const PAGE_SIZE = 10;

function PokemonList() {
    const { page } = useParams();
    const navigate = useNavigate();
    const currentPage = parseInt(page);

    const [pokemonList, setPokemonList] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (isNaN(currentPage) || currentPage < 1) {
            setNotFound(true);
            return;
        }

        const fetchList = async () => {
            setLoading(true);
            setNotFound(false);
            try {
                const offset = (currentPage - 1) * PAGE_SIZE;
                const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${PAGE_SIZE}`);

                const total = Math.ceil(data.count / PAGE_SIZE);
                setTotalPages(total);

                if (currentPage > total) {
                    setNotFound(true);
                    return;
                }

                // Extract ID from each URL and fetch details
                const detailRequests = data.results.map(p => axios.get(p.url));
                const details = await Promise.all(detailRequests);
                setPokemonList(details.map(p_pokemon => p_pokemon.data));
            } catch (error) {
                console.error("Error fetching Pokémon list:", error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchList();
    }, [currentPage]);

    if (notFound) {
        return <NotFound />;
    }
    
    if (loading) {
        return <div>Loading.......</div>;
    }

    return (
        <div>
            <Typography variant="h4" textAlign="center" mt={2} mb={2}>Pokémon</Typography>
            <Grid container spacing={2} padding={2}>
                {pokemonList.map(pokemon => (
                    <Grid item xs={10} sm={4} md={3} lg={2} key={pokemon.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea component={Link} to={`/pokemon/${pokemon.id}`}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={ pokemon.sprites.versions["generation-iv"].platinum.front_default || pokemon.sprites.other["official-artwork"].front_default}
                                    alt={pokemon.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" textTransform="capitalize">{pokemon.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">#{pokemon.id}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/pokemon/page" />
        </div>
    );
}

export default PokemonList;