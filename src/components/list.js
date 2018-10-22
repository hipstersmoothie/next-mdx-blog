import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

import BlogStub from './stub';

const POSTS_PER_PAGE = 10;

const StubList = withRouter(({ posts, perPage = POSTS_PER_PAGE, router }) => {
  const pages = Math.ceil(posts.length / perPage);
  const currentPage = Number(router.query.page || 1);

  return (
    <div className="postList">
      <div>
        {posts
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map((post, i) => (
            <BlogStub key={i} post={post} prefetch={i < 3} />
          ))}
      </div>

      <div className="container pagination-container">
        <nav
          className="pagination is-small"
          role="navigation"
          aria-label="pagination"
        >
          {currentPage !== 1 && (
            <Link href={`/blog?page=${currentPage - 1}`}>
              <a className="pagination-previous">Previous</a>
            </Link>
          )}
          {currentPage !== pages && (
            <Link href={`/blog?page=${currentPage + 1}`}>
              <a className="pagination-previous">Next page</a>
            </Link>
          )}
          <ul className="pagination-list">
            {posts.slice(0, pages).map((post, index) => (
              <li key={`${post.urlPath}-${index}`}>
                <Link href={`/blog?page=${index + 1}`}>
                  <a
                    className={`pagination-link ${(currentPage === index + 1 ||
                      (index === 0 && !currentPage)) &&
                      'is-current'}`}
                    aria-label={`Goto page ${index + 1}`}
                  >
                    {index + 1}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <style jsx>{`
        .pagination-container {
          max-width: 1000px;
          margin: 4rem auto;
        }
        .pagination-container ul {
          list-style: none;
        }
        .postList {
          margin: 1.5rem;
        }
        .bottomFade {
          width: 800px;
          height: 200px;
          z-index: 99;
          position: absolute;
          bottom: 0;
          left: 0;
          background: url(/static/bottom-fade.png) bottom left;
        }
      `}</style>
    </div>
  );
});

export default StubList;
