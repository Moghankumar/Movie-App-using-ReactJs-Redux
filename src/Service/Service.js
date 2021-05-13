// import axios from "axios";
// const apikey = "1f6091b9694f5fd0faad141515ed0f90";
// const url = "https://api.themoviedb.org/3";
// const nowPlayingUrl = `${url}/movie/now_playing`;
// const topRatedUrl = `${url}/movie/top_rated`;
// const movieUrl = `${url}/discover/movie`;
// const genreUrl = `${url}/genre/movie/list`;
// const moviesUrl = `${url}/discover/movie`;
// const personUrl = `${url}/trending/person/day`;

// export const fetchMovies = async () => {
//   try {
//     const { data } = axios.get(nowPlayingUrl, {
//       params: {
//         api_key: apikey,
//         language: "en_US",
//         page: 1,
//       },
//     });

//     const posterURL = "https://image.tmdb.org/t/p/original/";
//     const modifiedData = data["results"].map((m) => ({
//       id: m["id"],
//       backPoster: posterURL + m["backdrop_path"],
//       popularity: m["popularity"],
//       title: m["title"],
//       poster: posterURL + m["poster_path"],
//       overview: m["overview"],
//       rating: m["vote_average"],
//     }));
//     return modifiedData;
//   } catch (error) {
//     console.log("Fetch Movies error:", error);
//   }
//   // axios
//   //   .get(nowPlayingUrl, {
//   //     api_key: apikey,
//   //     language: "en_US",
//   //   })
//   //   .then((res) => {
//   //     console.log("Check:", res);
//   //   })
//   //   .then((error) => {
//   //     console.log("Error:", error);
//   //   });
// };
// export const fetchGenre = () => {};
// export const fetchMovieByGenre = () => {};
// export const fetchPerson = () => {};
// export const fetchTopRatedMovies = () => {};
// export const fetchMovieDetails = () => {};
// export const fetchMovieVideos = () => {};
// export const fetchCasts = () => {};
// export const fetchSimilarMovie = () => {};
