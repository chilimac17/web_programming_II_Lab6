import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, List, ListItem, Chip, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "./NotFound";

function Type() {
    const { id } = useParams();
    const [type, setType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchType = async () => {
            try {
                const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${id}`);
                setType(data);
            } catch (error) {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchType();
    }, [id]);

    if (notFound) return <NotFound />;
    if (loading) return <div>Loading....</div>

    const extractId = (url) => url.split("/").filter(Boolean).pop();
    const dr = type.damage_relations;

    const DamageSection = ({ label, types }) => (
        <div>
            <Typography variant="body2"><strong>{label}:</strong></Typography>
            <Stack direction="row" flexWrap="wrap" gap={1} mt={0.5}>
                {types.length === 0
                    ? <Typography variant="body2" color="white">None</Typography>
                    : types.map(t => (
                        <Chip
                            key={t.name}
                            label={t.name}
                            component={Link}
                            to={`/types/${extractId(t.url)}`}
                            clickable
                            size="small"
                            sx={{ textTransform: "capitalize" }}
                        />
                    ))
                }
            </Stack>
        </div>
    );

    return (
        <div>
            <Typography variant="h3" textTransform="capitalize" gutterBottom>{type.name}</Typography>

            <Typography variant="h5" gutterBottom>Damage Relations</Typography>
            <DamageSection label="Double damage to" types={dr.double_damage_to} />
            <DamageSection label="Double damage from" types={dr.double_damage_from} />
            <DamageSection label="Half damage to" types={dr.half_damage_to} />
            <DamageSection label="Half damage from" types={dr.half_damage_from} />
            <DamageSection label="No damage to" types={dr.no_damage_to} />
            <DamageSection label="No damage from" types={dr.no_damage_from} />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h5" gutterBottom>Pokémon with this Type</Typography>
            <List dense>
                {type.pokemon.map(({ pokemon }) => (
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

export default Type;