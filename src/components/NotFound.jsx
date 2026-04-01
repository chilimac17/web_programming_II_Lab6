import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

function NotFound() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={8} gap={2}>
            <Typography variant="h2">404</Typography>
            <Typography variant="h5">Page Not Found</Typography>
            <Typography variant="body1" color="text.secondary">
                That route, Pokémon, ability, or type doesn't exist.
            </Typography>
            <Button variant="contained" component={Link} to="/">
                Go Home
            </Button>
        </Box>
    );
}

export default NotFound;