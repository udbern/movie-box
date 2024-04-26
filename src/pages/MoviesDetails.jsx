import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { IoTicketOutline } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import Mobile from "../components/MobileSidaebar";
import Logo from "../assets/Logo2.png";
import { Link } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import Modal from "react-modal";

// My API key for themoviedb.org
const key = "420ea1ce6b91149d335150a115e26337";

function MovieDetails() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [videoUrl, setVideoUrl] = useState(null);
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        // Make an API request to fetch now playing movies
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`
        );
        setNowPlayingMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    fetchNowPlayingMovies();
  }, []);

  // Fetch video data and store URL
  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
      );
      setMovie(response.data);

      const videoResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}`
      );
      setVideoUrl(videoResponse.data.results[0].key);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const formatRuntime = (minutes) => {
    const remainingMinutes = minutes % 60;
    return `${remainingMinutes}m`;
  };

  const formatReleaseDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <section className="flex">
        <div
          className={`md:hidden absolute top-0 bg-white w-[60%] shadow-xl z-20  rounded-md ${
            isSidebarOpen ? "" : "hidden"
          }`}
        >
          <Mobile />
        </div>
        <div className="hidden md:flex md:flex-[3] lg:flex-[2]">
          <Sidebar />
        </div>

        <div className="flex-[7] p-5 ">
          <div className="flex justify-between items-center p-2 mb-5 ">
            <Link
              to="/"
              className="md:hidden flex  cursor-pointer  justify-start w-full"
            >
              <img className=" w-40 px-4" src={Logo} alt="logo.png" />
            </Link>
            <div className="md:hidden flex justify-end text-2xl  ">
              <div
                className="bg-[#BE123C] w-8 h-8 md:w-[36px] md:h-[36px] rounded-full flex flex-col justify-center items-center space-y-1 cursor-pointer"
                onClick={toggleSidebar}
              >
                <div className="bg-white w-4 h-0.5 md:w-6 md:h-1"></div>
                <div className="bg-white w-4 h-0.5 md:w-6 md:h-1"></div>
              </div>
            </div>
          </div>

          {loading ? (
            <p className="text-2xl flex justify-center items-center  h-full w-full ">
              Loading...
            </p>
          ) : (
            <div>
              <div className="  relative h-60 md:h-[300px] lg:h-[449px] w-full rounded-md shadow-md overflow-hidden">
                <img
                  className="object-cover object-center w-full h-full "
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  alt={movie?.title}
                  loading="lazy"
                />
                {/* Play button */}
                <div
                  className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-[80px] md:h-[80px] rounded-full  cursor-pointer flex justify-center items-center"
                  onClick={openModal}
                >
                  <CiPlay1 className="hover-text-black text-white motion-safe:animate-pulse  duration-500 cursor-pointer  text-4xl md:text-7xl" />
                </div>

                <Modal  className="h-8 mt-20 md:mx-4 lg:mx-20   "  isOpen={modalIsOpen}>

                <button className="  capitalize justify-self-end  font-bold text-xl  "  onClick={closeModal}>Close</button>
                  <div className=" h-80  md:h-full w-full">
                  {videoUrl && (
                    <div className="relative w-full h-80 md:h-[600px] ">
                      <iframe
                        className="absolute top-0 left-0 h-full object-cover object-center w-full "
                        src={`https://www.youtube.com/embed/${videoUrl}`}
                        allowFullScreen
                      />
                    </div>
                  )}
                  </div>
                  

                  
                </Modal>
              </div>
              <div className=" flex-wrap md:flex-nowrap md:flex  text-left  items-center md:space-x-4 p-2 text-[#404040] lg:text-[23px] font-normal ">
                <p data-testid="movie-title">{movie?.title}</p>
                <p data-testid="movie-release-date">
                  {formatReleaseDate(movie?.release_date)}
                </p>
                <p data-testid="movie-runtime">
                  {formatRuntime(movie?.runtime)}
                </p>
              </div>
              <div className="flex-wrap  md:flex   ">
                <div className="flex-[3] p-2 space-y-3">
                  <p
                    data-testid="movie-overview"
                    className="text-[#333] font-semibold  md:text-sm lg:text-xl"
                  >
                    {movie?.overview}
                  </p>
                  <p>Directors: {movie?.directors}</p>
                  <p>Actors: {movie?.actors}</p>
                  <p>Stars: {movie?.stars}</p>
                  <div>
                    <button className=" bg-[#BE123C] hover:bg-[#a13b54] duration-300 ease-in-out text-[#FFFFFF]  px-10 py-2  rounded-xl ">
                      Top-rated movie
                    </button>
                  </div>
                </div>
                <div className="flex-[2]">
                  <div className="grid p-2 justify-center space-y-5">
                    <button className="bg-[#BE123C] hover:bg-[#a13b54] duration-300 ease-in-out  py-2 px-6 rounded-lg text-[#FFFFFF]  flex items-center justify-center gap-2 ">
                      <IoTicketOutline />
                      See Showtimes
                    </button>
                    <button className="flex  md:text-sm lg:text-xl items-center justify-center gap-2 bg-[#be123c19] hover:bg-[#af708119] duration-300 ease-in-out py-2 px-6 rounded-lg">
                      <TfiMenuAlt />
                      More watch options
                    </button>
                    <div className="relative grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
                      {nowPlayingMovies.slice(3, 6).map((movie) => (
                        <img
                          key={movie.id}
                          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                          alt={movie.title}
                        />
                      ))}
                      <div className="absolute bottom-0 h-10 w-full text-white">
                        <button className="relative w-full h-full flex items-center text-xs justify-center gap-1">
                          <TfiMenuAlt className="text-xl" /> The Best Movies and
                          Shows in September
                        </button>
                        <div className="absolute inset-0 flex items-center justify-center bg-black opacity-40 hover:opacity-40 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default MovieDetails;
