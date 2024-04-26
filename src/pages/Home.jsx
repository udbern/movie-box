// Import necessary modules and components
import React from 'react';
import requests from '../Requests';
import Main from '../components/Main';
import Top10 from '../components/Top10';
import Navbar from "../components/Navbar";
import Series from "../components/Series"


function Home() {
  return (
    <>
      <Navbar />
      <Main />
      <Top10 title='top 10 Movies' fetchURL={requests.requestTrending} />
      <Series title='Top 10 Series' fetchURL={requests.requestUpcomingSeries} />
    </>
  );
}


export default Home;