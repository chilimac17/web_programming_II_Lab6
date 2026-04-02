import React, { useState, useEffect } from "react";
import { Typography, List, ListItem } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "./NotFound";

function Ability() {
    const { id } = useParams();
    const [ability, setAbility] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchAbility = async () => {
            try {
                const { data } = await axios.get(`https://pokeapi.co/api/v2/ability/${id}`);
                setAbility(data);
            } catch (error) {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchAbility();
    }, [id]);

    if (notFound) return <NotFound />;
    if (loading) return <div>Loading....</div>

    const extractId = (url) => url.split("/").filter(Boolean).pop();

    const englishEffect = ability.effect_entries.find(e => e.language.name === "en");
    const englishFlavor = ability.flavor_text_entries.find(e => e.language.name === "en");

    return (
        <div>
            <Typography variant="h3" textTransform="capitalize" gutterBottom>{ability.name}</Typography>

            <Typography variant="body1"><strong>Generation:</strong> {ability.generation.name}</Typography>
            <Typography variant="body1"><strong>Main Series:</strong> {ability.is_main_series ? "Yes" : "No"}</Typography>

            <br />

            {englishEffect && (
                <div mb={2}>
                    <Typography variant="h6">Effect</Typography>
                    <Typography variant="body1">{englishEffect.effect}</Typography>
                    <Typography variant="body2" color="white" mt={1}>{englishEffect.short_effect}</Typography>
                </div>
            )}

            {englishFlavor && (
                <div mb={2}>
                    <Typography variant="h6">Flavor Text</Typography>
                    <Typography variant="body1">{englishFlavor.flavor_text}</Typography>
                </div>
            )}

            <br />

            <Typography variant="h6" gutterBottom>Pokémon with this Ability</Typography>
            <List dense>
                {ability.pokemon.map(({ pokemon }) => (
                    <ListItem key={pokemon.name}>
                        <Link to={`/pokemon/${extractId(pokemon.url)}`} style={{ textDecoration: "none" }}>
                            <Typography textTransform="capitalize" color="white">{pokemon.name}</Typography>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Ability;