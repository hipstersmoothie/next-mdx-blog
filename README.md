<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/notebook.png">
  <h1>next-mdx-blog</h1>
  <p>Easy blog for next.js</p>
</div

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier) [![CircleCI](https://img.shields.io/circleci/project/github/hipstersmoothie/next-mdx-blog/master.svg?style=for-the-badge)](https://circleci.com/gh/hipstersmoothie/next-mdx-blog) [![npm](https://img.shields.io/npm/v/next-mdx-blog.svg?style=for-the-badge)](https://www.npmjs.com/package/next-mdx-blog) [![npm](https://img.shields.io/npm/dt/next-mdx-blog.svg?style=for-the-badge)](https://www.npmjs.com/package/next-mdx-blog)

`next-mdx-blog` enables you to easily add a blog to any `next.js` based project.

EXAMPLE: http://hipstersmoothie.com/blog/

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

You can store your blog posts anywhere in the `pages` directory. But to keep things tidy I like to keep all blog posts in `pages/blog`.

### Blog Post Format

A post has a `meta` header. The rest of the blog post is MDX. Anything in the `meta` header will be stored.

```mdx
export const meta = {
  author: 'Andrew Lisowski',
  authorLink: 'https://github.intuit.com/alisowski',
  avatar: 'https://avatars2.githubusercontent.com/u/1192452?s=400&v=4'
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
const withBlog = require('next-mdx-blog');
const withMDX = require('@zeit/next-mdx')();

module.exports = withPlugins([withMDX, withBlog], {
  pageExtensions: ['js', 'mdx']
});
```

Now you `next` website will generate a `posts.js` with all the metadata about the posts in your project. You can use to build your blog. Anything stored in the `meta` header can be found here.

#### Configuration

You can add a global author by passing a configuration objecting into `next-mdx-blog`.

```js
const withBlog = require('next-mdx-blog');
const withMDX = require('@zeit/next-mdx')();

module.exports = withPlugins([withMDX, withBlog], {
  author: 'Andrew Lisowski',
  authorLink: 'https://github.intuit.com/alisowski',
  avatar: 'https://avatars2.githubusercontent.com/u/1192452?s=400&v=4',
  pageExtensions: ['js', 'mdx']
});
```

##### Asset Prefix

If you website is being served out of something other than the root domain you might need to add a prefix to your urls. Such as is the case with github pages.

```js
const withBlog = require('next-mdx-blog');
const withMDX = require('@zeit/next-mdx')();

module.exports = withPlugins([withMDX, withBlog], {
  assetPrefix: 'my-github-project',
  pageExtensions: ['js', 'mdx']
});
```

### Components

`next-mdx-blog` comes with default `list` and `post` components to build your blog with. You do not need to use these components, they are sensible defaults.

To get these to work you should also include `bulma` in your head somehow

```html
<link
  rel="stylesheet"
  href="https://jenil.github.io/bulmaswatch/default/bulmaswatch.min.css"
/>
```

#### Usage with next.js

To use the components with next.js you have to flush the styles. This is a bug in styled-jsx component package + next.js. To remedy this manually flush the styles:

```js
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import flushBlog from 'next-mdx-blog/dist/components/flush';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    return { html, head, errorHtml, chunks, styles: [flush(), flushBlog()] };
  }

  render() {}
}
```

#### List

A list of blog posts. Each post displays a small preview of it's content. You must dynamically require the blog posts to get the previews working. This component should be used to display the blog index.

`pages/blog.js`:

```js
import React from 'react';
import Head from 'next/head';
import BlogIndex from 'next-mdx-blog/dist/components/list';

import postsData from '../posts';

// Dynamically import some components
postsData.forEach(post => {
  post.file = import('../pages' + post.filePath.replace('pages', ''));
});

const blogPage = ({ posts = postsData }) => (
  <div className="blog-index">
    <Head>
      <title>Blog Posts</title>
    </Head>

    <BlogIndex posts={posts} stubClassName="content" />
  </div>
);

// Before page loads await the dynamic components. prevents blog preview page flash.

blogPage.getInitialProps = async () => {
  await Promise.all(
    postsData.map(async post => {
      post.BlogPost = (await post.file).default;

      return post;
    })
  );

  return { posts: [...postsData] };
};

export default blogPage;
```

##### List Props

###### posts

The post index generated by the next plugin.

###### perPage

How many posts to display per page.

###### className

Classname for the root div.

###### stubClassName

Classname for the post stubs.

###### foldHeight

How much of the post should be displayed before the fold.

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
            <BlogPost
              post={posts.find(post => post.urlPath === pathname)}
              className="content"
            >
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

<Post post={meta}>
# Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
</Post>
```

##### Post Props

###### children

Post body.

###### className

Classname to wrap the post in.

###### post

The post meta data to display.

##### \_app.js - Asset Prefix

If you are prefixing your URLS you will need to identify posts by prefixing the pathname.

```js
const prefixUrl = (p) => path.join(assetPrefix, p)

<BlogPost post={posts.find(post => post.urlPath === prefixUrl(pathname))}>
  <Component {...pageProps} />
</BlogPost>
```
