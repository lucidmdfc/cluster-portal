"use client"

import StudioLandingHero from "../landing/studio-hero";
import StudioLandingIntroduce from "../landing/studio-video";
import ClusterFaqs from "../../FAQ_common-component/faqs";

import { _tours, _travelPosts, _testimonials } from 'src/_mock';

function StudioLandingView({ StudioData } : any) {

  
  // const roj = StudioData[0].faqs
  const carouselData = StudioData[0]?.carousel || [];
  const videoCta = StudioData[0]?.videoCTA || [];
  const videoTitle = StudioData[0]?.videoTitle || [];

  console.log(StudioData);

  return (
    <>
      <StudioLandingHero tours={carouselData.slice(0, 3)} />
      <StudioLandingIntroduce videoCta={videoCta} videoTitle={videoTitle} />
      {/* <ClusterFaqs roj={roj} /> */}
    </>
  )
}
export default StudioLandingView