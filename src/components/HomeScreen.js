import React from 'react'
import Nav from './Nav'
import './styles/HomeScreen.css'
import Banner from './Banner'
import Row from './Row'
import requests from '../Request'

function HomeScreen() {
  return (
    <div className='homeScreen'>
      {/* Nav */}
      <Nav />

      {/* Banner */}
      <Banner />

      {/* Row */}
      <Row 
        title='Netflix Originals'
        fetchUrl={requests.fetchNetlifxOriginals} isLargeRow
      />
            <Row 
        title='Trending Now'
        fetchUrl={requests.fetchTrending} isLargeRow
      />
            <Row 
        title='Top Rated Movies'
        fetchUrl={requests.fetchTopRated} isLargeRow
      />
            <Row 
        title='Action Movies'
        fetchUrl={requests.fetchActionMovies} isLargeRow
      />
            <Row 
        title='Comedy Movies'
        fetchUrl={requests.fetchComedyMovies} isLargeRow
      />
            <Row 
        title='Horror Movies'
        fetchUrl={requests.fetchHorrorMovies} isLargeRow
      />
            <Row 
        title='Romance Movies'
        fetchUrl={requests.fetchRomanceMovies} isLargeRow
      />
            <Row 
        title='Documentaries'
        fetchUrl={requests.fetchDocumentaries} isLargeRow
      />
     

    </div>
  )
}

export default HomeScreen