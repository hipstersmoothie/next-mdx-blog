<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/notebook.png">
  <h1>next-mdx-blog</h1>
  <p>Easy blog for next.js</p>
</div

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier) [![CircleCI](https://img.shields.io/circleci/project/github/hipstersmoothie/next-mdx-blog/master.svg?style=for-the-badge)](https://circleci.com/gh/hipstersmoothie/next-mdx-blog) [![npm](https://img.shields.io/npm/v/next-mdx-blog.svg?style=for-the-badge)](https://www.npmjs.com/package/next-mdx-blog) [![npm](https://img.shields.io/npm/dt/next-mdx-blog.svg?style=for-the-badge)](https://www.npmjs.com/package/next-mdx-blog)

`next-mdx-blog` enables you to easily add a blog to any `next.js` based project.

Features:

- MDX Blog
- RSS Feed
- Simple Setup
- Customizable Rendering

## Install

```
yarn add next-mdx-blog
```

## Usage

### Blog Post Format

A post has a `meta` header. The rest of the blog post is MDX. Anything in the `meta` header will be stored.

```mdx
export const meta = {
  publishDate: '2018-05-10T12:00:00Z',
  title: 'First Post',
}

# Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
```

### Next Plugin

To get you blog index to build you must the the `next-mdx-blog` next build plugin. You must also add `@zeit/next-mdx` to parse your blog posts.

Make sure to include `mdx` in your `pageExtensions`.

```js
const withPlugins = require('next-compose-plugins');

// Generates Blog Index
const withBlog = require('next-mdx-blog').Plugin();
const withMDX = require('@zeit/next-mdx')();

module.exports = withPlugins([withMDX, withBlog], {
  pageExtensions: ['js', 'mdx']
});
```

Now you `next` website will generate a `posts.js` with all the metadata about the posts in your project. You can use to build your blog. Anything stored in the `meta` header can be found here.

### Components

`next-mdx-blog` comes with default `list` and `post` components to build your blog with. You do not need to use these components, they are sensible defaults.,

#### List

A list of blog posts. Each post displays a small preview of it's content. You must dynamically require the blog posts to get the previews working. This component should be used to display the blog index.

```js
import React from 'react';
import Head from 'next/head';
import BlogIndex from 'next-mdx-blog/dist/components/list';

import posts from '../posts';

posts.forEach(async post => {
  // Webpack Magic
  post.file = import('../pages' + post.filePath.replace('pages', ''));
});

export default () => (
  <div className="blog-index">
    <Head>
      <title>Blog Posts</title>
    </Head>

    <BlogIndex posts={posts} />
  </div>
);
```

#### Post

A full blog post. To get your blog content to render inside the blog posts component your must either

1. Modify `_app.js` to render blog content inside appropriate wrapper

```js
import React from 'react';
import App, { Container } from 'next/app';
import Layout from '../components/layout';
import BlogPost from 'next-mdx-blog/dist/components/post';
import posts from '../posts';

// Override the App class to put layout component around the page contents
// https://github.com/zeit/next.js#custom-app

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const { pathname } = this.props.router;

    return (
      <Container>
        <Layout pathname={pathname} active={active}>
          {pathname.includes('blog/') ? (
            <BlogPost post={posts.find(post => post.urlPath === pathname)}>
              <Component {...pageProps} />
            </BlogPost>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </Container>
    );
  }
}
```

2. Wrap blog content inside each `mdx` file. This is more work but you can customize each blog post.

```mdx
export const meta = {
  publishDate: '2018-05-10T12:00:00Z',
  title: 'First Post',
}

import Post from 'next-mdx-blog/dist/components/post'

<Post post={{
  publishDate: '2018-05-10T12:00:00Z',
  title: 'First Post',
}}>
# Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
</Post>
```

####
