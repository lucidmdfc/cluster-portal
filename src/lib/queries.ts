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
  faqs[]->{
    question,
    answer
  },
  about->{...},
  seo->{...}
}`);
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
export const EVENTS_QUERY = defineQuery(`*[_type == "ActusEvents"]{
  _id,
  image->{
    ...,
    alt,
    credit
  },
  title,
  slug,
  "subTitle": SubTitle,
  description,
  body,
  tags,
  author->{
    name,
    slug,
    image->{
      imageAsset->{
        ...,
        alt,
        credit
      }
    }
  },
  publicationDate,
  timeToRead
} | order(publicationDate desc)`);
// image Retrieves the image of the event
// title Retrieves the title of the event
// slug Retrieves the slug of the event
// subTitle Retrieves the subtitle of the event
// description Retrieves the description of the event
// body Retrieves the body of the event
// tags Retrieves the tags of the event
// author Retrieves the author of the event
// publicationDate Retrieves the publication date of the event
// timeToRead Retrieves the time to read of the event
// order(publicationDate desc) Sorts results by publication date in descending order
export const PUBLICATION_QUERY = defineQuery(` *[_type == "publication"]{
    _id,
     image->{
      ...,
      alt,
      credit
    },
    slug,
    title,
    "subTitle":SubTitle,
    description,
    body,
    publicationDate,
    "pdfUrl": pdfFile.asset->url,
   
  }
`);
// image Retrieves the image of the publication
// title Retrieves the title of the publication
// slug Retrieves the slug of the publication
// subTitle Retrieves the subtitle of the publication
// body Retrieves the body of the publication

export const ACCUEIL_QUERY = defineQuery(`*[_type == "Accueil"]{
  _id,
  image->{
    ...,
    alt,
    credit
  },
  title,
  slug,
  "subTitle": SubTitle,
  body,
  isForm
}
  `);

export const FOOTER_QUERY = defineQuery(`*[_type == "footer"][0]{
  _id,
  socialLinks,
  sitemapLinks[]{...},
  copyrightText,
  extraSections[]{
    title,
    content,
  },
  ...
}`);

export const STUDIO_QUERY = defineQuery(`*[_type == "studio"] {
  carousel[] {
    mainTitle,
    subtitle,
    duration,
    review,
    price,
    buttonCTA,
    illustrations[]->{
      _id,
      imageAsset->{
        _id,
        image
      }
    }
  },
  videoTitle[] {
    keyTitle,
    title
  },
  videoCTA[] {
    keyTitle,
    title
  },
  faqs[]->{
    question,
    answer
  },
  seo->{
    metaDescription,
    title,
    keywords
  }
}`);

// Example Query to fetch candidate data

export const getPersonalSpaceQuery = defineQuery(`*[_type == "candidate" && clerkId == $clerkId] {
  _id,
  clerkId,
  firstName,
  lastName,
  email,
  phone,
  address,
  birthday,
  city,
  gender,
  InterestedSector[]->{
    _id,
    sectorName
  },
  CV {
    asset->{
      _id,
      url
    }
  }
}`);

export const JOB_QUERY = defineQuery(`*[_type == "job"]{
  _id,
  title,
  description,
  location,
  publicationDate,
  expirationDate,
  experience,
  contract,
  salary,
  body,
  salaryDetails {
    minSalary,
    maxSalary
  },
  level,
  JobPost {
    asset->{
      _id,
      url
    }
  },
  company->{
    _id,
    name,
    email,
    sector ->{
      sectorName
    },
	  illustrations[]->{
        ...,
        imageAsset->{...}
      },
    },
}`)

export const APPLICATION_QUERY = defineQuery(`
  *[_type == "application" && candidate._ref == $candidateId && job._ref == $jobId] {
    _id, 
    _createdAt, 
    _updatedAt, 
    "slug": slug.current,
    applicationDate,
    status,
    // Reference fields
    job->{
      _id,
      title
    },
    recruiter,
    candidate->{
      _id
    }
  }
`);


