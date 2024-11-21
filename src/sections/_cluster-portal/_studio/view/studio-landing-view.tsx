"use client"

import StudioLandingHero from "../landing/studio-hero";
import StudioLandingIntroduce from "../landing/studio-video";
import ClusterFaqs from "../../FAQ_common-component/faqs";

 function TravelLandingView() {
  return (
    <>
      <StudioLandingHero tours={[]} />
      <StudioLandingIntroduce />
      {/* <ClusterFaqs roj={[]} /> */}
    </>
  )
}
export default TravelLandingView