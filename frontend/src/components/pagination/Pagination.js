import React, { useEffect, useState } from 'react'
import * as styled from "./Pagination.styled";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [visiblePages, setVisiblePages] = useState([]);

    const generatePageNumbers = () => {
        const newVisiblePages = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === currentPage ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                newVisiblePages.push(i);
            }
        }

        setVisiblePages(newVisiblePages);
    };

    const handlePageChange = (newPage) => {
        onPageChange(newPage);
    };

    const handlePreviousPage = () => {
        onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        onPageChange(currentPage + 1);
    };

    useEffect(() => {
        generatePageNumbers();
    }, [currentPage])


    return (
        <styled.Container>
            {currentPage > 1 && (
                <styled.Button onClick={handlePreviousPage}>Previous</styled.Button>
            )}
            {visiblePages.map((page, index) => (
                <React.Fragment key={index}>
                    {index > 0 && page !== visiblePages[index - 1] + 1 && (
                        <styled.Dots>...</styled.Dots>
                    )}
                    <styled.Button active={page === currentPage} onClick={() => handlePageChange(page)}>
                        {page}
                    </styled.Button>
                </React.Fragment>
            ))}
            {currentPage < totalPages && (
                <styled.Button onClick={handleNextPage}>Next</styled.Button>
            )}
        </styled.Container>
    );
}
