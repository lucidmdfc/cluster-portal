"use client"

import StudioLandingHero from "../landing/studio-hero";
import StudioLandingIntroduce from "../landing/studio-video";
import ClusterFaqs from "../../Dynamic_FAQ/faqs";

import { _tours, _travelPosts, _testimonials } from 'src/_mock';

function StudioLandingView({ StudioData } : any) {

  
  const carouselData = StudioData[0]?.carousel || [];
  const videoCta = StudioData[0]?.videoCTA || [];
  const videoTitle = StudioData[0]?.videoTitle || [];
  const faqs = StudioData[0].faqs

  console.log(faqs);

  return (
    <>
      <StudioLandingHero tours={carouselData.slice(0, 3)} />
      <StudioLandingIntroduce videoCta={videoCta} videoTitle={videoTitle} />
      <ClusterFaqs Faqs={faqs} />
    </>
  )
}
export default StudioLandingView