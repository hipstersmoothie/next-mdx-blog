# next-blog

`next-blog` enables you to easily add a blog to any `next.js` based project.

Features:

- MDX Blog
- Simple Setup
- Customizable

## Blog Post Format

A post has a `meta` header. The rest of the blog post is MDX.

```mdx
export const meta = {
  publishDate: '2018-05-10T12:00:00Z',
  title: 'First Post',
}

# Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
```

## Usage

### Next Plugin

To get you blog index to build you must the the `next-blog` next build plugin. You must also add `@zeit/next-mdx` to parse your blog posts.

Make sure to include `mdx` in your `pageExtensions`.

```js
const withPlugins = require('next-compose-plugins');

// Generates Blog Index
const withBlog = require('next-blog').Plugin();
const withMDX = require('@zeit/next-mdx')();

module.exports = withPlugins([withMDX, withBlog], {
  pageExtensions: ['js', 'mdx']
});
```

Now you `next` website will generate a `posts.js` with all the metadata about the posts in your project that you can use to build your blog. Anything stored in the `meta` header can be found here.

### Components

`next-blog` comes with default `list` and `post` components to build your blog with.

#### List

A list of blog posts. Each post displays a small preview of it's content. You must dynamically require the blog posts to get the previews working.

```js
import React from 'react';
import Head from 'next/head';
import BlogIndex from 'next-blog/dist/components/list';

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

A full blog post.. To get your blog content to render inside the blog posts component your must either

1. Modify `_app.js` to render blog content inside appropriate wrapper

```js
import React from 'react';
import App, { Container } from 'next/app';
import Layout from '../components/layout';
import BlogPost from 'next-blog/dist/components/post';
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

import Post from 'next-blog/dist/components/post'

<Post post={{
  publishDate: '2018-05-10T12:00:00Z',
  title: 'First Post',
}}>
# Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
</Post>
```

####
