import React from 'react';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';

import BlogStub from './stub';
import Pagination from './pagination';

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
            <BlogStub key={`${post.filePath}`} post={post} prefetch={i < 3} />
          ))}
      </div>

      <Pagination
        pages={100}
        className="container"
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
});

export default StubList;
