import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const NewsletterPageTemplate = ({ title, topimage, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <img src={topimage.childImageSharp.fluid.src} alt="dummy"  />
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

NewsletterPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  topimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const NewsletterPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <NewsletterPageTemplate
        contentComponent={HTMLContent}
        topimage={post.frontmatter.topimage}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

NewsletterPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default NewsletterPage

export const newsletterPageQuery = graphql`
  query NewsletterPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        topimage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
