import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import PostBody from './post-body';

class BlogStub extends Component {
  static propTypes = {
    className: PropTypes.string,
    foldHeight: PropTypes.number,
    post: PropTypes.object.isRequired
  };

  static defaultProps = {
    className: '',
    foldHeight: 200
  };

  state = {
    BlogPost: null,
    fade: false
  };

  async componentDidMount() {
    if (!this.props.post.BlogPost) {
      const file = await this.props.post.file;

      this.setState({
        BlogPost: file.default
      });
    }

    if (
      this.container.offsetHeight > this.props.foldHeight &&
      !this.state.fade
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ fade: true });
    }
  }

  render() {
    const { post } = this.props;
    const BlogPost = post.BlogPost || this.state.BlogPost;

    return (
      <PostBody
        className="stubPost"
        post={post}
        title={
          <Link href={post.urlPath}>
            <a>{post.title}</a>
          </Link>
        }
      >
        <div
          ref={el => {
            this.container = el;
          }}
          className={`preview ${this.props.className}`}
        >
          {BlogPost && <BlogPost />}
          {this.state.fade && (
            <div>
              <div className="bottomFade" />
              <Link href={post.urlPath}>
                <a className="readMore">Read More</a>
              </Link>
            </div>
          )}
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
            .preview {
              max-height: 525px;
              overflow: hidden;
            }
            :global(.stubPost .blogBody) {
              margin-bottom: 0 !important;
            }
          `}
        </style>
      </PostBody>
    );
  }
}

export default BlogStub;
