import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import './ProductGalleryThumbnails.css'

const ProductGalleryThumbnails = ({ productimages }) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
        <>
            {productimages && productimages[currentImageIndex] &&
                <Image
                    fluid={productimages[currentImageIndex].localFile.childImageSharp.fluid}
                    key={productimages[currentImageIndex].id}
                    className="Gallery--FeaturedImage"
                />
            }

            <div className="table">
                <div className="row">
                    {productimages && productimages.length > 1 && productimages.map((image, index) => (
                        <span className="Thumbnail" onClick={() => setCurrentImageIndex(index)}>
                            <Image
                                fluid={image.localFile.childImageSharp.fluid}
                                key={image.id}
                                className="cell"
                                imgStyle={{
                                    objectFit: "contain",
                                }}
                            />
                        </span>
                    ))}
                </div>
            </div>

        </>
    )
}

export default ProductGalleryThumbnails
