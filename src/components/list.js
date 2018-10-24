import React from 'react';
import Router, { withRouter } from 'next/router';
import Pagination from 'bulma-pagination-react';

import BlogStub from './stub';

const POSTS_PER_PAGE = 10;

const StubList = withRouter(
  ({
    posts,
    perPage = POSTS_PER_PAGE,
    router,
    className,
    stubClassName,
    foldHeight
  }) => {
    const pages = Math.ceil(posts.length / perPage);
    const currentPage = Number(router.query.page || 1);

    return (
      <div className={`postList ${className}`}>
        <div>
          {posts
            .slice((currentPage - 1) * perPage, currentPage * perPage)
            .map((post, i) => (
              <BlogStub
                key={`${post.filePath}`}
                className={stubClassName}
                foldHeight={foldHeight}
                post={post}
                prefetch={i < 3}
              />
            ))}
        </div>

        <Pagination
          pages={pages}
          currentPage={currentPage}
          onChange={page => Router.push(`/blog?page=${page}`)}
        />

        <style jsx>
          {`
            .postList {
              margin: 1.5rem;
            }
            .postList :global(ul) {
              margin-left: 0;
              margin-top: 0;
            }
          `}
        </style>
      </div>
    );
  }
);

export default StubList;
