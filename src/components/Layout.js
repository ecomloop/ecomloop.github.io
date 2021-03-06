import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Meta from './Meta'
import Nav from './Nav'
import Footer from './Footer'
import ContextProvider from '../provider/ContextProvider'

import 'modern-normalize/modern-normalize.css'
import './globalStyles.css'

export default ({ children, meta, description, title }) => {
    return (
        <ContextProvider>
            <StaticQuery
                query={graphql`
        query IndexLayoutQuery {
          settingsYaml {
            siteTitle
            siteDescription
            googleTrackingId
            socialMediaCard {
              image
            }
          }
          allProducts: allShopifyProduct {
            edges {
                node {
                    title
                    handle
                }
            }
          }
          allPosts: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "postCategories" } } }
            sort: { order: DESC, fields: [frontmatter___date] }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `}
                render={data => {
                    const { siteTitle, siteDescription, socialMediaCard, googleTrackingId } =
                        data.settingsYaml || {},
                        subNav = {
                            products: data.allProducts.hasOwnProperty('edges')
                                ? data.allProducts.edges.map(post => {
                                    return { ...post.node, ...post.node }
                                })
                                : false
                        }

                    return (
                        <Fragment>
                            <Helmet
                                defaultTitle={`${title} | ${siteTitle}`}
                                titleTemplate={`%s | ${siteTitle}`}
                            >
                                <meta name="description" content={description||siteDescription} />
                                <meta name="og:description" content={description||siteDescription} />
                                <meta name="twitter:description" content={description||siteDescription} />
                                {title}
                                <link href="https://ucarecdn.com" rel="preconnect" crossorigin />
                                <link rel="dns-prefetch" href="https://ucarecdn.com" />
                                
                                {/* Add font link tags here */}
                            </Helmet>

                            <Meta
                                googleTrackingId={googleTrackingId}
                                absoluteImageUrl={
                                    socialMediaCard &&
                                    socialMediaCard.image &&
                                    socialMediaCard.image
                                }
                                {...meta}
                                {...data.settingsYaml}
                            />



                            <Nav subNav={subNav} />

                            <Fragment>{children}</Fragment>

                            <Footer />
                        </Fragment>
                    )
                }}
            />
        </ContextProvider>
    )
}
