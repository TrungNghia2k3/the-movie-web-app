import React from "react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  maxVisiblePages = 5,
  showFirstLast = true,
  showPrevNext = true,
  size = "", // 'sm', 'lg', or '' for default
  className = "",
}) => {
  // Tính toán range của các trang hiển thị
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Điều chỉnh start nếu end đã đạt totalPages
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const sizeClass = size ? `pagination-${size}` : "";

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Page navigation">
      <ul className={`pagination ${sizeClass} ${className}`.trim()}>
        {/* First Page Button */}
        {showFirstLast && currentPage > 1 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageClick(1)}
              aria-label="First"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
        )}

        {/* Previous Button */}
        {showPrevNext && (
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous"
            >
              <span aria-hidden="true">&lsaquo;</span>
            </button>
          </li>
        )}

        {/* Ellipsis nếu có gap với page đầu */}
        {visiblePages[0] > 1 && (
          <>
            <li className="page-item">
              <button className="page-link" onClick={() => handlePageClick(1)}>
                1
              </button>
            </li>
            {visiblePages[0] > 2 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
          </>
        )}

        {/* Page Numbers */}
        {visiblePages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageClick(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Ellipsis nếu có gap với page cuối */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageClick(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* Next Button */}
        {showPrevNext && (
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next"
            >
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </li>
        )}

        {/* Last Page Button */}
        {showFirstLast && currentPage < totalPages && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageClick(totalPages)}
              aria-label="Last"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
