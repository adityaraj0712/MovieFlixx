import React ,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./style.scss"

import useFetch from '../../../hooks/useFetch';

import { useSelector } from 'react-redux'
 
import Img from '../../../components/lazyLoadImage/Img';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

 


const HeroBanner = () => {
    const[background,setBackground] =useState('');
    const[query,setQuery]= useState('');
    const navigate = useNavigate();

    const {url} = useSelector((state)=> state.home);

    //calling api from useFetch...
    const {data,loading} = useFetch("/movie/upcoming")

    useEffect(()=>{

        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20 )]?.backdrop_path;

        setBackground(bg);

    },[data])
    
    const searchQueryHandler = (event)=>{
        event.preventDefault();
        //search bar should not be empty and 
        // the only on clicking the enter button out api should hit
        // console.log(event.key);
        if( query.length > 0 ){
            navigate(`/search/${query}`);
        }

    }
  return (
    <div className='HeroBanner'>

       {!loading &&  <div className="backdrop-img">
            <Img src={background}/>

        </div>}

        <div className="opacity-layer">
            
        </div>
        <ContentWrapper>
       
            <div className="heroBannerContent">
                <span className="title">Welcome</span>
                <span className="subTitle">
                    Millions of movies, TV shows and prople to discover.
                    Explore now.
                </span>
                <form onSubmit={searchQueryHandler}>
                    <div className="searchInput">
                        <input type="text" 
                        placeholder='Search for a movie or tv show...' 
                        value={query}
                        onChange={(e)=>setQuery(e.target.value)}
                        
                        />
                        <button type='submit'>Submit</button>
                    </div>
                </form>
               
            </div>
      
        </ContentWrapper>
        
      
    </div>
  )
}

export default HeroBanner
