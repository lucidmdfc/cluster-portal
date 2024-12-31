import ClusterFaqs from 'src/sections/_cluster-portal/Dynamic_FAQ/faqs';
import AboutUs from 'src/sections/_cluster-portal/_presentation/about-us';

type props = {
  ClusterData: any;
};
export default function ClusterView({ ClusterData }: props) {
  // console.log(ClusterData.faqs)
  return (
    <>
      <AboutUs roj={ClusterData} />
      <ClusterFaqs Faqs={ClusterData.faqs} />
    </>
  );
}
