// lib/queries.ts
import { defineQuery } from 'next-sanity';

export const BLOG_QUERY = defineQuery(`*[_type == "blog"] {
  _id,
  title,
  slug,
  body,
  description,
  illustrations[]->{
    isCoverImage,
    isFeaturedImage,
    caption,
    imageAsset->{
    alt,
    credit,
    image,
  },
  },
  seo->,
  category,
  readingTime,
  publishedAt,
  author->{
    ...,
    image->{
      ...,
      imageAsset->
    }
  },
  isDisplayedOnHome
} | order(publishedAt desc)`);
//  ..., Includes all fields of the "blog" document
//  category, Retrieves the category of the blog
// isDisplayedOnHome Indicates if the blog should be displayed on the homepage
// order(publishedAt desc)  Sorts results by publication date in descending order

export const PRESENTATION_QUERY = defineQuery(`*[_type == "presentation"][0]{
        _id,
        slug,
        imagePresentation->{...},
        faqs,
        about->{...},
	      seo->{...}
      }`);
// _id Retrieves the ID of the Roj
// slug Retrieves the slug of the Roj
// about Retrieves the About Us information of the Roj
// imageRoj Retrieves the image of the Roj
// seo Retrieves the SEO information of the Roj
export const TAGS_QUERY = defineQuery(` *[_type == "tag"] {
        _id,
        title,
        slug,
        description
      } | order(title)`);
// title Retrieves the title of the tag
// slug Retrieves the slug of the tag
// description Retrieves the description of the tag
// order(title) Sorts results by title in ascending order

export const ABOUT_US_QUERY = defineQuery(`*[_type == "aboutUs"]{
        _id,
        title,
        slug,
        body
      }`);
// title Retrieves the title of the About Us page
// slug Retrieves the slug of the About Us page
// body Retrieves the body of the About Us page
export const COMMUNIQUES_QUERY = defineQuery(`*[_type =="communiques"]{
	  ...,
    author->{
      ...,
      image->{
        ...,
      imageAsset->{...}
      }
    },
	  publishedAt,
	  illustrations[]->{
        ...,
        imageAsset->{...}
      },
	  isDisplayedOnHome,
	}`);
// ..., Includes all fields of the "communiques" document from content
// publishedAt Retrieves the publication date of the communique
// illustrations Retrieves the illustrations image with some metadata  of the communique
// isDisplayedOnHome Indicates if the communique should be displayed on the homepage
