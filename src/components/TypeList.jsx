import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemButton, CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import NotFound from "./NotFound";

const PAGE_SIZE = 5;

function TypeList() {
    const { page } = useParams();
    const currentPage = parseInt(page);

    const [types, setTypes] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (isNaN(currentPage) || currentPage < 1) {
            setNotFound(true);
            return;
        }

        const fetchTypes = async () => {
            setLoading(true);
            setNotFound(false);
            try {
                const offset = (currentPage - 1) * PAGE_SIZE;
                const { data } = await axios.get(
                    `https://pokeapi.co/api/v2/type?offset=${offset}&limit=${PAGE_SIZE}`
                );

                const total = Math.ceil(data.count / PAGE_SIZE);
                setTotalPages(total);

                if (currentPage > total) {
                    setNotFound(true);
                    return;
                }

                setTypes(data.results);
            } catch (error) {
                console.error("Error fetching types:", error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchTypes();
    }, [currentPage]);

    const extractId = (url) => url.split("/").filter(Boolean).pop();

    if (notFound) return <NotFound />;
    if (loading) return <div>Loading.......</div>;

    return (
        <div>
            <Typography variant="h4" textAlign="center" mb={2}>Types</Typography>
            <List>
                {types.map(type => (
                    <ListItem key={type.name} disablePadding>
                        <ListItemButton component={Link} to={`/types/${extractId(type.url)}`}>
                            <Typography textTransform="capitalize">{type.name}</Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/types/page" />
        </div>
    );
}

export default TypeList;