import Head from 'next/head';
import dayjs from 'dayjs';

const BlogPost = ({ children, post }) => (
  <article className="card box blogPost">
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
          <h1 className="title blogTitle">{post.title}</h1>
          <p className="subtitle is-6 blogSubtitle">
            <a target="_blank" to={post.authorLink} href={post.authorLink}>
              {post.author}
            </a>
            <span> on {dayjs(post.publishDate).format('MMMM D, YYYY')}</span>
          </p>
        </div>
      </div>
      <div className="blogBody">{children}</div>
    </div>

    <style jsx>{`
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
      }
      @media screen and (min-width: 769px) {
        .blogBody {
          margin: 0 4rem;
        }
      }
    `}</style>
  </article>
);

export default BlogPost;
