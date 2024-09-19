import React from 'react';

export default function Pagination({ currentPage, totalPages, handleNextPage, handlePrevPage }) {
    return (
        <div className='Pagination'>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className='PrevButton'>
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className='NextButton'>
                Next
            </button>
        </div>
    );
};
