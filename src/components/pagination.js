import React from 'react';

const Page = ({ currentPage, index, onChange }) => (
  <li>
    <a
      onClick={() => onChange(index)}
      className={`pagination-link ${(currentPage === index ||
        (index === 1 && !currentPage)) &&
        'is-current'}`}
      aria-label={`Goto page ${index}`}
    >
      {index}
    </a>
  </li>
);

const Ellipses = () => (
  <li>
    <span className="pagination-ellipsis">&hellip;</span>
  </li>
);

const getVisiblePages = (visibleRadius, currentPage, maxPages) => {
  const visiblePages = [];

  let start = currentPage - visibleRadius;
  let end = currentPage + visibleRadius;

  if (start < 1) {
    start = 1;
    end = start + visibleRadius * 2;
  }

  if (end > maxPages) {
    start = maxPages - visibleRadius * 2;
    end = maxPages;
  }

  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }

  return visiblePages;
};

const Pagination = ({
  pages,
  currentPage = 1,
  visibleRadius = 1,
  className,
  onChange = () => {}
}) => {
  const visiblePages = getVisiblePages(visibleRadius, currentPage, pages);
  const pagesComponents = [];

  if (visiblePages[0] > visibleRadius) {
    pagesComponents.push(
      <Page index={1} currentPage={currentPage} onChange={onChange} />
    );

    if (visiblePages[0] > visibleRadius + 1) {
      pagesComponents.push(<Ellipses />);
    }
  }

  visiblePages.map(page =>
    pagesComponents.push(
      <Page index={page} currentPage={currentPage} onChange={onChange} />
    )
  );

  if (currentPage < pages - visibleRadius) {
    if (currentPage < pages - visibleRadius - 1) {
      pagesComponents.push(<Ellipses />);
    }

    pagesComponents.push(
      <Page index={pages} currentPage={currentPage} onChange={onChange} />
    );
  }

  return (
    <div className={`pagination-container ${className}`}>
      <nav
        className="pagination is-small"
        role="navigation"
        aria-label="pagination"
      >
        {currentPage !== 1 && (
          <a
            onClick={() => onChange(currentPage - 1)}
            className="pagination-previous nav"
          >
            Previous
          </a>
        )}
        {currentPage !== pages && (
          <a
            onClick={() => onChange(currentPage + 1)}
            className="pagination-previous nav"
          >
            Next page
          </a>
        )}

        <ul className="pagination-list">{pagesComponents}</ul>
      </nav>

      <style jsx>
        {`
          .pagination-container {
            max-width: 1000px;
            margin: 4rem auto;
          }
          .pagination-container ul {
            list-style: none !important;
          }
          .nav {
            flex: 100%;
          }
          @media screen and (min-width: 400px) {
            .nav {
              flex: initial;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Pagination;
