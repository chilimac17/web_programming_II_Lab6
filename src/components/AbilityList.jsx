import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemButton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import NotFound from "./NotFound";

const PAGE_SIZE = 5;

function AbilityList() {
    const { page } = useParams();
    const currentPage = parseInt(page);

    const [abilities, setAbilities] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (isNaN(currentPage) || currentPage < 1) {
            setNotFound(true);
            return;
        }

        const fetchAbilities = async () => {
            setLoading(true);
            setNotFound(false);
            try {
                const offset = (currentPage - 1) * PAGE_SIZE;
                const { data } = await axios.get(
                    `https://pokeapi.co/api/v2/ability?offset=${offset}&limit=${PAGE_SIZE}`
                );

                const total = Math.ceil(data.count / PAGE_SIZE);
                setTotalPages(total);

                if (currentPage > total) {
                    setNotFound(true);
                    return;
                }

                setAbilities(data.results);
            } catch (error) {
                console.error("Error fetching abilities:", error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAbilities();
    }, [currentPage]);

    // Helper: extract ID from PokeAPI URL
    const extractId = (url) => url.split("/").filter(Boolean).pop();

    if (notFound) {
        return <NotFound />;
    }
    
    if (loading) {
        return <div>Loading.......</div>;
    }
    return (
        <div>
            <Typography variant="h4" textAlign="center" mb={2}>Abilities</Typography>
            <List>
                {abilities.map(ability => (
                    <ListItem key={ability.name} disablePadding>
                        <ListItemButton component={Link} to={`/abilities/${extractId(ability.url)}`}>
                            <Typography textTransform="capitalize">{ability.name}</Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/abilities/page" />
        </div>
    );
}

export default AbilityList;