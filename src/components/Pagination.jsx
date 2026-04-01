import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

function Pagination({ currentPage, totalPages, basePath }) {
    const navigate = useNavigate();

    return (
        <Box display="flex" justifyContent="center" gap={2} mt={3} mb={3}>
            {currentPage > 1 && (
                <Button variant="contained" onClick={() => navigate(`${basePath}/${currentPage - 1}`)}>
                    Previous Page
                </Button>
            )}
            {currentPage < totalPages && (
                <Button variant="contained" onClick={() => navigate(`${basePath}/${currentPage + 1}`)}>
                    Next Page
                </Button>
            )}
        </Box>
    );
}

export default Pagination;