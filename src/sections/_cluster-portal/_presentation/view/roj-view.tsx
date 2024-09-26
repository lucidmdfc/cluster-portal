import RojFaqs from 'src/sections/_cluster-portal/_presentation/faqs';
import AboutUs from 'src/sections/_cluster-portal/_presentation/about-us';

type props = {
  roj: any;
};
export default function RojView({ roj }: props) {
  return (
    <>
      <AboutUs roj={roj} />
      <RojFaqs roj={roj} />
    </>
  );
}
