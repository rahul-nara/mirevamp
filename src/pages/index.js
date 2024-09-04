import Link from 'next/link';
import HeroBanner from './components/home/herobanner';
import TopCategories from './components/home/topcategories';
import WhatsTrending from './components/home/whatstrending';
import CompareMobiles from './components/home/comparemobiles';
import config from '../../config.json'
import FeaturedCollection from './components/home/featuredcollection';
import SearchMobilesSection from './components/home/searchmobilessection';
import PopularMobiles from './components/common/popularmobiles';
import InsiderWheel from './components/home/insiderwheel';
import PageLoader from './components/common/pageLoader';

export default function Home(props) {
  return (
    <>
      <PageLoader />
        <main>
          <HeroBanner smData={props.smartphonesData} />
          <TopCategories />
          <SearchMobilesSection smData={props.smartphonesData} />
          <WhatsTrending smData={props.smartphonesData} />
          {/* <PopularMobiles smData={props.smartphonesData} /> */}
          <InsiderWheel />
          <FeaturedCollection />
          <CompareMobiles />
          {/* <CompareMobiles smData={props.smartphonesData} /> */}
        </main>
    </>
  )
}


export async function getServerSideProps() {
  let res = await fetch(config['smartphones']);
  const smartphones = await res.json();
  return {
    props: {
      smartphonesData:smartphones.results.smartphoneData,
    },
  };
}