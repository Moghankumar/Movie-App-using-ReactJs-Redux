import React, { Component } from "react";
// import { fetchMovies } from "../Service/Service";
import Header from "./Header";
import RBCarousel from "react-bootstrap-carousel";
import axios from "axios";
import { fetchmovies } from "../Redux";
import { connect } from "react-redux";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Body from "./Body";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: "",
      GenreId: 28,
      MGlist: "",
      GMovies: "",
      VideoKey: "",
      videotitle: "",
    };
    this.handleGenreChange = this.handleGenreChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/upcoming?language=en_IN&api_key=1f6091b9694f5fd0faad141515ed0f90&page=1"
      )
      .then((res) => {
        this.props.fetchmovies(res.data.results);

        var movies = this.props.data.slice(0).map((item, index) => {
          if (item.backdrop_path) {
            return (
              <div key={index}>
                <div className="Carousel-center">
                  <img
                    style={{ height: 550, justifyContent: "center" }}
                    src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                    alt={item.title}
                  />
                </div>

                <div
                  className="carousel-center "
                  style={{ background: "none" }}
                >
                  <i
                    class="far fa-play-circle"
                    style={{ cursor: "pointer", fontSize: "60px" }}
                    onClick={() => {
                      this.Videodata(item.id, item.title);
                      this.setState({
                        Isopen: true,
                      });
                    }}
                  ></i>
                </div>
                <div
                  className="carousel-caption"
                  style={{
                    fontSize: "50px",
                    textAlign: "center",
                    background: "none",
                  }}
                >
                  {item.title}
                </div>
              </div>
            );
          }
        });
        this.setState({
          movies: movies,
        });
      })
      .catch((error) => {
        console.log("Error in Movies: ", error);
      });

    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en_IN&api_key=1f6091b9694f5fd0faad141515ed0f90&page=1"
      )
      .then((res) => {
        this.setState({
          GMovies: res.data.genres,
        });
      })
      .catch((err) => {
        console.log("Error in Genre List:", err);
      });

    this.handleGenreChange();
  }
  handleGenreChange() {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?language=en_IN&api_key=1f6091b9694f5fd0faad141515ed0f90&page=1&with_genres=${this.state.GenreId}`
      )
      .then((res) => {
        var movieList = res.data.results.slice(0, 4).map((ml, index) => {
          return (
            <div className="col-md-3 col-sm-6" key={index}>
              <div className="card">
                <Link to={`/movie/${ml.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${ml.poster_path}`}
                    className="img-fluid"
                    alt={ml.title}
                  ></img>
                </Link>
              </div>
              <div className="mt-2">
                <p className="text-left font-weight-bold"> {ml.title}</p>
                <p className="text-left">Rating : {ml.vote_average}</p>
                <ReactStars
                  count={ml.vote_average}
                  size={20}
                  activeColor={"#ffd700"}
                  color="#ffd700"
                ></ReactStars>
              </div>
            </div>
          );
        });
        this.setState({
          MGlist: movieList,
        });
      })
      .catch((err) => {
        console.log("Error in Genre Id :", err);
      });
  }
  Videodata(id, name) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en_IN&api_key=1f6091b9694f5fd0faad141515ed0f90`
      )
      .then((res) => {
        this.setState({ VideoKey: res.data.results[0].key, videotitle: name });
      })
      .catch((err) => {
        console.log("Error in Video Key Section:", err);
      });
  }

  VideoPlayer = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: "bolder" }}
          >
            {this.state.videotitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "red" }}>
          {this.state.VideoKey ? (
            <ReactPlayer
              className="container-fluid"
              url={`https://www.youtube.com/watch?v=${this.state.VideoKey}`}
              playing
              width="100%"
              controls
            ></ReactPlayer>
          ) : (
            <p className="text-color">No video for this movie....</p>
          )}
        </Modal.Body>
      </Modal>
    );
  };
  render() {
    return (
      <div className="App ">
        <Header />
        <div className="container ">
          <div className="row">
            <this.VideoPlayer
              show={this.state.Isopen}
              onHide={() => {
                this.setState({ Isopen: false });
              }}
            ></this.VideoPlayer>
            <div className="col">
              <RBCarousel
                autoplay={true}
                version={4}
                pauseOnVisibility={true}
                slidesshowSpeed={500}
              >
                {this.state.movies}
              </RBCarousel>
            </div>
          </div>
          <div className="mt-2">
            {this.state.GMovies &&
              this.state.GMovies.map((g, index) => {
                return (
                  <li className="list-inline-item" key={index}>
                    <button
                      type="button"
                      className={
                        this.state.GenreId == g.id
                          ? "btn btn-active"
                          : "btn btn-outline-info"
                      }
                      onClick={() => {
                        this.setState(
                          {
                            GenreId: g.id,
                          },
                          () => {
                            this.handleGenreChange();
                          }
                        );
                      }}
                    >
                      {g.name}
                    </button>
                  </li>
                );
              })}
            {/* {this.Genre} */}
          </div>
          <div className="row mt-2">{this.state.MGlist}</div>
          <div className="mt-2">
            <Body />
          </div>
        </div>
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    data: state.home.data || [],
    // genre: state.genre || [],
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    fetchmovies: (data) => {
      dispatch(fetchmovies(data));
    },
    // genremovies: (genre) => {
    //   dispatch(genremovies(genre));
    // },
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Home);
