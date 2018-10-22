import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';

import dayjs from 'dayjs';

class BlogStub extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    prefetch: PropTypes.bool
  };

  static defaultProps = {
    prefetch: false
  };

  state = {
    BlogPost: null
  };

  async componentDidMount() {
    try {
      this.setState({
        BlogPost: (await this.props.post.file).default
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { post, prefetch } = this.props;
    const { BlogPost } = this.state;

    return (
      <article className="card blogPost">
        <Head>
          <title>{post.title}</title>
        </Head>
        <div className="card-content">
          <div className="media blogHeader">
            <div className="media-content has-text-centered">
              <div
                className="image authorImage"
                style={{
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative',
                  backgroundImage: `url('${post.avatar}')`
                }}
              >
                <svg
                  width="80"
                  height="80"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%',
                    marginBottom: -4
                  }}
                />
              </div>
              <h1 className="title blogTitle">
                <Link href={post.urlPath} prefetch={prefetch}>
                  <a>{post.title}</a>
                </Link>
              </h1>
              <p className="subtitle is-6 blogSubtitle">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  to={post.authorLink}
                  href={post.authorLink}
                >
                  {post.author}
                </a>
                <span>
                  {' '}
                  on {dayjs(post.publishDate).format('MMMM D, YYYY')}
                </span>
              </p>
            </div>
          </div>
          <div className="blogBody">
            {BlogPost && <BlogPost />}

            <div className="bottomFade" />

            <Link href={post.urlPath} prefetch={prefetch}>
              <a className="readMore">Read More</a>
            </Link>
          </div>
        </div>

        <style jsx>
          {`
            .bottomFade {
              width: 100%;
              border-bottom-right-radius: 5px;
              border-bottom-left-radius: 5px;
              height: 200px;
              z-index: 99;
              position: absolute;
              bottom: 0;
              left: 0;
              background: url(/static/bottom-fade.png) bottom left;
            }
            .readMore {
              position: absolute;
              bottom: 20px;
              left: 0;
              z-index: 100;
              width: 100%;
              text-align: center;
            }
            .authorImage {
              border: 3px solid #ccc;
              border-radius: 50%;
              height: 60px;
              left: 50%;
              margin-left: -30px;
              position: absolute !important;
              top: -30px;
              width: 60px;
            }
            .blogPost {
              margin: auto auto 65px;
              max-width: 800px;
              width: 100%;
              margin-top: 100px;
            }
            .blogTitle {
              margin-top: 0 !important;
              font-size: 2rem;
              font-weight: lighter;
              line-height: 2;
            }
            .blogSubtitle {
              color: #909aa0;
              margin-bottom: 2rem;
            }
            .blogHeader {
              margin-top: 2.5rem;
            }
            .blogBody {
              line-height: 1.4;
              margin: 0 1rem;
              max-height: 525px;
              overflow: hidden;
            }
            @media screen and (min-width: 769px) {
              .blogBody {
                margin: 0 4rem;
              }
            }
          `}
        </style>
      </article>
    );
  }
}

export default BlogStub;
