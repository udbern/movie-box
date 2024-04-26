
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3 
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 
  }
};




function Series({ title, fetchURL }) {
  
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchURL);
        
        setSeries(response.data.results.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top 10 series:", error);
        setLoading(false);
      }
    };

    fetchData(); 
  }, [fetchURL]); 

  return (
    <section className="max-w-6xl mx-auto ">
      <div className="flex justify-between items-center pt-10 pb-10 px-5">
        <h2 className="text-xl md:text-4xl font-bold capitalize">{title}</h2>
        <Link to="" className="text-red-700 flex text-lg items-center gap-2">
          see all
          <AiOutlineRight />
        </Link>
      </div>
      {loading ? (
        
        <p className="text-xl text-center animate-pulse duration-500">Loading...</p>
      ) : (
        <div className="  ">
          <Carousel Carousel responsive={responsive} keyBoardControl={true} removeArrowOnDeviceType={["tablet", "mobile"]}   className=" " >
            {series.map((item) => (
              <Link
                data-testid="movie-card"
                to={`/series/${item.id}`}
                key={item.id}
                className="  w-[50px] "
              >
                <div className="w-full    ">
                  <img
                    data-testid="movie-poster"
                    className="w-full h-full object-cover object-center"
                    src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                    alt={item?.title}
                    loading="lazy"
                  />
                </div>
                
                <h1 data-testid="series-title" className="p-2 capitalize font-bold text-sm md:text-xl">
                  {item?.title}
                </h1>
                
                <p data-testid="series-release-date" className="p-2 text-xs md:text-sm">{item?.release_date}</p>
              </Link>
            ))}
          </Carousel>
        </div>
      )}
    </section>
  );
}

export default Series;
