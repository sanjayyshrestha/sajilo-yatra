import React from 'react'
import NepalHeroSection from './Hero'
import NewsletterSubscription from './ui/Subscription'
import RecommendedInterests from './ui/Recommendation'
const Home = () => {
  return (
    <div>
      <NepalHeroSection/>
      <RecommendedInterests/>
      {/* <NewsletterSubscription/> */}
    </div>
  )
}

export default Home