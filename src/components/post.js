import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import PostBody from './post-body';

const BlogPost = ({ children, post, className }) => (
  <PostBody post={post} className={`full-blog-post ${className}`}>
    <Head>
      <title>{post.title}</title>
    </Head>

    {children}

    <style jsx>
      {`
        :global(.blogPost.full-blog-post) {
          width: 90%;
        }
      `}
    </style>
  </PostBody>
);

BlogPost.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  post: PropTypes.object.isRequired
};

BlogPost.defaultProps = {
  className: ''
};

export default BlogPost;
