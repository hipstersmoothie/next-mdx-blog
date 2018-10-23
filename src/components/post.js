import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import PostBody from './post-body';

const BlogPost = ({ children, post }) => (
  <PostBody post={post}>
    <Head>
      <title>{post.title}</title>
    </Head>

    {children}
  </PostBody>
);

BlogPost.propTypes = {
  children: PropTypes.node.isRequired,
  post: PropTypes.object.isRequired
};

export default BlogPost;
