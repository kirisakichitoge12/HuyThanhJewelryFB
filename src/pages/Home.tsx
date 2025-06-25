import React from 'react';      
import WeddingHeroSection from '../components/WeddingHeroSection';
import FeaturedTemplatesSection from '../components/FeaturedTemplatesSection';
import FeaturesSection from '../components/FeaturesSection';
import FAQSection from '../components/FAQSection';
import NewsSection from '../components/NewsSection';

const Home: React.FC = () => {
    return (
        <section className='font-svn-sans'>  
            <WeddingHeroSection/>
            <FeaturedTemplatesSection/>
            <FeaturesSection/>
            <FAQSection/>
            <NewsSection/>
        </section>
    )
}

export default Home