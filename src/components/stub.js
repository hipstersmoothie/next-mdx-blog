import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import PostBody from './post-body';

class BlogStub extends Component {
  static propTypes = {
    foldHeight: PropTypes.number,
    post: PropTypes.object.isRequired,
    prefetch: PropTypes.bool
  };

  static defaultProps = {
    foldHeight: 200,
    prefetch: false
  };

  state = {
    BlogPost: null,
    fade: false
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

  componentDidUpdate() {
    if (
      this.container.offsetHeight > this.props.foldHeight &&
      !this.state.fade
    ) {
      this.setState({ fade: true });
    }
  }

  render() {
    const { post, prefetch } = this.props;
    const { BlogPost } = this.state;

    return (
      <PostBody
        post={post}
        title={
          <Link href={post.urlPath}>
            <a>{post.title}</a>
          </Link>
        }
      >
        <div className="preview" ref={el => (this.container = el)}>
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
          `}
        </style>
      </PostBody>
    );
  }
}

export default BlogStub;
