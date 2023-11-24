import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom"; // Removed useLocation since it's not used
import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import movieFlixx from '../../assets/movieFlixx.png'
import movieFlixx2 from '../../assets/movieFlixx2.png'


const Header = () => {
  const [show, setShow] = useState("top");  //css classes
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false); // Initially, search bar is hidden
  const navigate = useNavigate();
  const location=  useLocation();
  
  useEffect(()=>{
    window.scrollTo(0,0);
  },[location]);

  const controlNavbar= ()=>{
    // console.log(window.scrollY);
    if(window.scrollY>150){
      if(window.scrollY > lastScrollY && !mobileMenu)
      {
        setShow("hide");
      }
      else{
        setShow("show");
      }

    }else{
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(()=>{
  window.addEventListener("scroll", controlNavbar)
  return ()=> {
    window.removeEventListener("scroll",controlNavbar)
    };
  },[lastScrollY]);

  const searchQueryHandler = (event) => {
    event.preventDefault();
    if (query.length > 0) {
      navigate(`/search/${query}`);
      setShowSearch(false);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch); // Toggle the search bar state
  };

  const closeSearch = () => {
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else if (type === "tv") {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  useEffect(() => {
    // Add any additional side effects here
    // This effect runs when the component mounts

    return () => {
      // Cleanup code if needed
      // This code runs when the component unmounts
    };
  }, []); // Empty dependency array means this effect only runs once, similar to componentDidMount

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          {/* <img src={logo} alt="" onClick={()=> navigate("/")} /> */}
          <img src={movieFlixx2} alt="" onClick={()=> navigate('/')}  />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem" onClick={toggleSearch}>
            <HiOutlineSearch />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={toggleSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={() => setMobileMenu(true)} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <form onSubmit={searchQueryHandler}>
              <div className="searchInput">
                <input
                  type="text"
                  placeholder="Search for a movie or TV show..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <VscChromeClose onClick={closeSearch} />
              </div>
            </form>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
