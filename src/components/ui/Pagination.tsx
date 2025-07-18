import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const showPages = 2; // Number of pages to display

    if (totalPages <= showPages + 2) {
      // If total pages is small, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(start + showPages - 1, totalPages - 1);
      
      if (start > 2) {
        pageNumbers.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      if (end < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      if (end < totalPages) {
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="pagination flex justify-center items-center pt-8 gap-2 bg-bgCareer component-paragraphs">
      <button
        className="w-6 h-6 md:w-8 md:h-8 border-bgContact border flex items-center justify-center rounded-lg bg-bgMain text-secondary hover:bg-yellow-400"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        title="First Page"
      >
        &lt;&lt;
      </button>
      <button
        className="w-6 h-6 md:w-8 md:h-8 border-bgContact border flex items-center justify-center rounded-lg bg-bgMain text-secondary hover:bg-yellow-400"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="Previous Page"
      >
        &lt;
      </button>
      
      {getPageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          className={`w-6 h-6 md:w-8 md:h-8 border-bgContact border flex items-center justify-center rounded-lg ${
            pageNumber === currentPage
              ? "bg-active font-medium text-bgMain"
              : pageNumber === '...'
                ? "bg-bgMain text-secondary hover:bg-yellow-400 cursor-default"
                : "bg-bgMain text-secondary hover:bg-yellow-400"
          }`}
          onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
          disabled={pageNumber === '...'}
        >
          {pageNumber}
        </button>
      ))}
      
      <button
        className="w-6 h-6 md:w-8 md:h-8 border-bgContact border flex items-center justify-center rounded-lg bg-bgMain text-secondary hover:bg-yellow-400"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="Next Page"
      >
        &gt;
      </button>
      <button
        className="w-6 h-6 md:w-8 md:h-8 border-bgContact border flex items-center justify-center rounded-lg bg-bgMain text-secondary hover:bg-yellow-400"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        title="Last Page"
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;