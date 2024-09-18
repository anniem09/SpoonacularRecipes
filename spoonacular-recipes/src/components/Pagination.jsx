import React from 'react';

export default function Pagination({ currentPage, totalPages, handleNextPage, handlePrevPage }) {
    return (
        <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};
