import React from "react";
import axios from "axios";
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component{

  state = {
    isLoading: true,
    movies: [],
  };

  getMoviews = async () =>{
    // const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    // console.log(movies.data.data.movies);

    const{
      data:{
        data:{ movies },
      },
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    //console.log(movies);

    //this.setState({ movies: movies});
    this.setState({ movies, isLoading: false });

  }

  componentDidMount(){
    
    // setTimeout(() => {
    //   this.setState({ isLoading: false});
    // }, 6000);

    //영화 데이터 로딩
    //const moviews = axios.get('https://yts-proxy.now.sh/list_movies.json');
    this.getMoviews();
  }

  render(){
    const { isLoading, movies } = this.state;

    //return <div>{isLoading ? 'Loading...' : 'We are ready'}</div>;
    return ( 
        <section className="container">
          { isLoading 
              ? 
                ( <div className="loader">
                    <span className="loader__text">'Loading...' </span>
                  </div>
                )
              : 
                (
                  <div className="movies">
                    {

                        movies.map( (movie) => (

                              <Movie 
                                key={movie.id}
                                id={movie.id}
                                year={movie.year}
                                title={movie.title}
                                summary={movie.summary}
                                poster={movie.medium_cover_image}
                                genres={movie.genres}
                              />                     
                        ))
                    }
                  </div>
                ) 
          }
        </section>
      );
  }
}

export default Home;