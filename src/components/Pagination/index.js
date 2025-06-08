import React, { useState } from "react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  loadingDelay = 300,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePageClick = async (page) => {
    if (page === currentPage || isLoading || page < 1 || page > totalPages)
      return;

    setIsLoading(true);

    // Delay để tăng UX
    setTimeout(async () => {
      await onPageChange(page);
      setIsLoading(false);
    }, loadingDelay);
  };

  // Tính toán 5 trang hiển thị
  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Nếu tổng số trang <= 5, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Nếu > 5 trang, tạo sliding window
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + 4);

      // Điều chỉnh nếu gần cuối
      if (end - start < 4) {
        start = Math.max(1, end - 4);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Page navigation" className="my-4">
      <ul className="pagination d-flex justify-content-center gap-2 m-0">
        {/* Previous Button */}
        <li className="page-item">
          <button
            className={`btn btn-transparent border-0 fs-5 text-light ${
              !canGoPrev || isLoading ? "disabled" : ""
            }`}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={!canGoPrev || isLoading}
            aria-label="Previous"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>

        {/* Page Numbers */}
        {visiblePages.map((page) => (
          <li key={page} className="page-item">
            <button
              className={`btn ${
                page === currentPage ? "btn-light" : "btn-outline-light"
              } ${isLoading ? "disabled" : ""}`}
              onClick={() => handlePageClick(page)}
              disabled={isLoading}
              aria-current={page === currentPage ? "page" : undefined}
              style={{ minWidth: "45px" }}
            >
              {isLoading && page === currentPage ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                page
              )}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li className="page-item">
          <button
            className={`btn btn-transparent border-0 fs-5 text-light ${
              !canGoNext || isLoading ? "disabled" : ""
            }`}
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={!canGoNext || isLoading}
            aria-label="Next"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
