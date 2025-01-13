import { sanityFetch } from 'src/lib/client';
import { JOB_QUERY } from 'src/lib/queries';
import CareerJobView from 'src/sections/_cluster-portal/_career/view/career-job-view';

// ----------------------------------------------------------------------

// function to fetch and process job data
async function fetchJobData(slug: string) {
  const SingleJobData = await sanityFetch({ 
    query: JOB_QUERY,
    params: { jobId: slug },
    revalidate: 3600,
    tags: [`job-${slug}`],
  });

  return { SingleJobData };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { SingleJobData } = await fetchJobData(params.slug);
  if (!SingleJobData) {
    return {
      title: 'Emploi Non Trouvé',
      description: 'L\'emploi demandé n\'a pas pu être trouvé.',
    };
  }

  return {
      title: SingleJobData[0].title || 'Poste',
      description: `${SingleJobData[0].title} - Découvrez une opportunité passionnante de rejoindre notre équipe et d\'avoir un impact dans ce rôle.` || 'Explorez cette opportunité de carrière passionnante.',
  };
}

// Main page component
export default async function CareerJobPage({ params }: { params: { slug: string } }) {
  const { SingleJobData } = await fetchJobData(params.slug);
  return <CareerJobView job={SingleJobData[0]} />;
}
