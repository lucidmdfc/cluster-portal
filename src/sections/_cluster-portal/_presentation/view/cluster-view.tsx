import ClusterFaqs from 'src/sections/_cluster-portal/_presentation/faqs';
import AboutUs from 'src/sections/_cluster-portal/_presentation/about-us';

type props = {
  ClusterData: any;
};
export default function ClusterView({ ClusterData }: props) {
  return (
    <>
      <AboutUs roj={ClusterData} />
      <ClusterFaqs roj={ClusterData} />
    </>
  );
}
