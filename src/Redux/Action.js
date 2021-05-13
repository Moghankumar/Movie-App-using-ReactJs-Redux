import axios from "axios";
export const FETCHMOVIES = "FETCHMOVIES";
export const GENREMOVIES = "GENREMOVIES";
export const TRENDINGPERSONSUC = "TRENDINGPERSONSUC";
export const TRENDINGPERSONREQ = "TRENDINGPERSONREQ";
export const TOPRATEDMOVIESUCCESS = "TOPRATEDMOVIESUCCESS";
export const TOPRATEDMOVIEREQ = "TOPRATEDMOVIEREQ";
export const WATCHLIST = "WATCHLIST";
export const WATCHLISTREQ = "WATCHLISTREQ";
export const WATCHLISTSUCCESS = "WATCHLISTSUCCESS";
export const POPULAR = "POPULAR";
export const POPULARMOVIESREQ = "POPULARMOVIESREQ";
export const POPULARMOVIESSUCCESS = "POPULARMOVIESSUCCESS";
export const NOWPLAYING = "NOWPLAYING";
export const NOWPLAYINGREQ = "NOWPLAYINGREQ";
export const NOWPLAYINGSUCCESS = "NOWPLAYINGSUCCESS";
export const fetchmovies = (data) => {
  return {
    type: FETCHMOVIES,
    data: data,
  };
};
export const genremovies = (genre) => {
  return {
    type: GENREMOVIES,
    genre: genre,
  };
};
export const trendingpersonsuc = (trending) => {
  return {
    type: TRENDINGPERSONSUC,
    trending: trending,
  };
};
export const trendingpersonreq = () => {
  return {
    type: TRENDINGPERSONREQ,
  };
};
export const trendingperson = () => {
  return (dispatch) => {
    dispatch(trendingpersonreq);
    axios
      .get(
        "https://api.themoviedb.org/3/trending/person/day?language=en_IN&with_original_language=ta&api_key=1f6091b9694f5fd0faad141515ed0f90"
      )
      .then((res) => {
        dispatch(trendingpersonsuc(res.data.results));
      })
      .catch((err) => {
        console.log("Error in Trending Persons section:", err);
      });
  };
};
export const topratedmoviereq = () => {
  return {
    type: TOPRATEDMOVIEREQ,
  };
};
export const topratedmoviesuccess = (toprated) => {
  return {
    type: TOPRATEDMOVIESUCCESS,
    toprateds: toprated,
  };
};

export const toprated = () => {
  return (dispatch) => {
    dispatch(topratedmoviereq);
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?language=en_IN&api_key=1f6091b9694f5fd0faad141515ed0f90"
      )
      .then((res) => {
        dispatch(topratedmoviesuccess(res.data.results));
      })
      .catch((err) => {
        console.log("Error in Top Rated Movies section:", err);
      });
  };
};
export const watchlistreq = () => {
  return {
    type: WATCHLISTREQ,
  };
};
export const watchlistsuccess = (list) => {
  return {
    type: WATCHLISTSUCCESS,
    list: list,
  };
};
export const watchlist = (list) => {
  return (dispatch) => {
    dispatch(watchlistreq());
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${list}?language=en_IN&api_key=1f6091b9694f5fd0faad141515ed0f90`
      )
      .then((res) => {
        dispatch(watchlistsuccess(res.data));
      })
      .catch((err) => {
        console.log("Error in WatchList section:", err);
      });
  };
};
export const popularmoviesreq = () => {
  return {
    type: POPULARMOVIESREQ,
  };
};
export const popularmoviessuccess = (popular) => {
  return {
    type: POPULARMOVIESSUCCESS,
    popular: popular,
  };
};
export const popularmovies = () => {
  return (dispatch) => {
    dispatch(popularmoviesreq());
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?language=en_IN&api_key=1f6091b9694f5fd0faad141515ed0f90&with_original_language=ta`
      )
      .then((res) => {
        dispatch(popularmoviessuccess(res.data.results));
      })
      .catch((err) => {
        console.log("Error in WatchList section:", err);
      });
  };
};
export const nowplayingreq = () => {
  return {
    type: NOWPLAYINGREQ,
  };
};
export const nowplayingsuccess = (nowplaying) => {
  return {
    type: NOWPLAYINGSUCCESS,
    nowplaying: nowplaying,
  };
};
export const nowplayingmovies = () => {
  return (dispatch) => {
    dispatch(nowplayingreq());
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en_IN&api_key=1f6091b9694f5fd0faad141515ed0f90&with_original_language=ta`
      )
      .then((res) => {
        dispatch(nowplayingsuccess(res.data.results));
      })
      .catch((err) => {
        console.log("Error in WatchList section:", err);
      });
  };
};
