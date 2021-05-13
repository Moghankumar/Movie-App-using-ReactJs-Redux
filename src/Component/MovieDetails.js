import axios from "axios";
import React, { Component } from "react";
import Header from "./Header";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Button, Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { watchlist } from "../Redux";
import { connect } from "react-redux";

export class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: "",
      Isopen: false,
      VideoKey: "",
      cast: "",
      similarmovies: "",
      addwatchlist: [],
      status: "",
    };
    this.apicalls = this.apicalls.bind(this);
  }

  componentDidMount() {
    this.apicalls(this.props.match.params.id);
  }

  apicalls(id) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?language=en_IN&api_key=1f6091b9694f5fd0faad141515ed0f90`
      )
      .then((response) => {
        this.setState({
          details: response.data,
        });
      })
      .catch((error) => {
        console.log("Error in Movie Details Section:", error);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en_IN&api_key=1f6091b9694f5fd0faad141515ed0f90`
      )
      .then((res) => {
        this.setState({ VideoKey: res.data.results[0].key });
      })
      .catch((err) => {
        console.log("Error in Video Key Section:", err);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en_IN&api_key=1f6091b9694f5fd0faad141515ed0f90`
      )
      .then((res) => {
        this.setState({
          cast: res.data.cast,
        });
      })
      .catch((error) => {
        console.log("Error in Movie Details Casts section:", error);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en_IN&api_key=1f6091b9694f5fd0faad141515ed0f90`
      )
      .then((res) => {
        this.setState({
          similarmovies: res.data.results,
        });
      })
      .catch((err) => {
        console.log("Error in Similar Movies section:", err);
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
            {this.state.details.title} - {this.state.details.original_title}
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
      <div>
        <Header />
        <div className="container">
          <div className="row mt-3">
            <this.VideoPlayer
              show={this.state.Isopen}
              onHide={() => {
                this.setState({ Isopen: false });
              }}
            ></this.VideoPlayer>
            <div className="col text-center" style={{ width: "100%" }}>
              <img
                className="img-fluid"
                src={`https://image.tmdb.org/t/p/original/${this.state.details.backdrop_path}`}
                alt={this.state.details.title}
              />
              <div className="carousel-center " style={{ background: "none" }}>
                <i
                  class="far fa-play-circle"
                  style={{ cursor: "pointer", fontSize: "60px" }}
                  onClick={() => {
                    this.setState({
                      Isopen: true,
                    });
                  }}
                ></i>
              </div>
              <div
                className="carousel-caption font-weight-bold"
                style={{
                  fontSize: "45px",
                  background: "none",
                }}
              >
                {this.state.details.title}
              </div>
            </div>
          </div>
          <div className="row mt-3" style={{ justifyContent: "space-between" }}>
            <div className="col-md-3">
              <p className="text-color font-weight-bold">TITLE</p>
              <p className=" font-weight-bold">{this.state.details.title}</p>
            </div>
            <div className="col-md-3">
              <Button
                disabled={this.props.list.id === this.state.details.id}
                onClick={() => {
                  this.props.watchlist(this.props.match.params.id);
                }}
              >
                Add Watch List
              </Button>
            </div>
            <div>
              <Link to="/">Back to Home</Link>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <p className="text-color font-weight-bold">Original Title</p>
              <p className=" font-weight-bold">
                {this.state.details.original_title}
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <p className="text-color" style={{ fontWeight: "bolder" }}>
                GENRE
              </p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <ul className="list-inline">
                {this.state.details.genres &&
                  this.state.details.genres.map((gen, index) => {
                    return (
                      <li className="list-inline-item" key={index}>
                        <button type="button" className="btn btn-outline-info">
                          {gen.name}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <p className="text-color font-weight-bold">OVERVIEW</p>
              <p className=" font-weight-bold">{this.state.details.overview}</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-3">
              <p className="text-color font-weight-bold">RELEASE DATE</p>
              <p className=" font-weight-bold">
                {this.state.details.release_date}
              </p>
            </div>
            <div className="col-md-3">
              <p className="text-color font-weight-bold">VOTE AVERAGE</p>
              <p className=" font-weight-bold">
                {this.state.details.vote_average}
              </p>
            </div>
            <div className="col-md-3">
              <div className="text-center">
                <p className="text-color font-weight-bold text-left">RATING</p>
                <ReactStars
                  count={this.state.details.vote_average}
                  size={20}
                  activeColor={"#ffd700"}
                  color1="#ffd700"
                ></ReactStars>
              </div>
            </div>
            <div className="col-md-3">
              <p className="text-color font-weight-bold">RUNTINE</p>
              <p className=" font-weight-bold">
                {this.state.details.runtime} minutes
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <p className="text-color font-weight-bold">CASTS</p>
            </div>
          </div>
          <div className="row mt-3">
            {this.state.cast &&
              this.state.cast.slice(0, 6).map((cc, index) => {
                if (cc.profile_path) {
                  return (
                    <div className="col-md-2 col-sm-4" key={index}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${cc.profile_path}`}
                        alt={cc.name}
                        className="img-fluid rounded-circle mx-auto d-block"
                      />
                      <p className="font-weight-bold text-center">{cc.name}</p>
                      <p className="font-weight-bold text-center text-color2">
                        {cc.character}
                      </p>
                    </div>
                  );
                }
              })}
          </div>
          <div className="row mt-3">
            <div className="col">
              <p className="text-color font-weight-bold">SIMILAR MOVIES</p>{" "}
              {this.state.similarmovies == "" ? (
                <p className="text-center">No Similar Movies</p>
              ) : null}
            </div>
          </div>
          <div className="row mt-3">
            {this.state.similarmovies &&
              this.state.similarmovies.slice(0, 6).map((sm, index) => {
                return (
                  <div className="col-md-2 col-sm-4" key={index}>
                    <Link
                      to={`/movie/${sm.id}`}
                      onClick={() => {
                        this.apicalls(sm.id);
                      }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original/${sm.poster_path}`}
                        alt={sm.title}
                        className="img-fluid"
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-left font-weight-bold">{sm.title}</p>

                      <p className="text-left">Rating : {sm.vote_average}</p>
                      <ReactStars
                        count={sm.vote_average}
                        size={20}
                        activeColor={"#ffd700"}
                        color="#ffd700"
                      ></ReactStars>
                    </div>
                  </div>
                );
              })}
          </div>
          <hr className="mt-3" style={{ borderTop: "1px solid #0275d8" }} />
          <div className="mt-3 mb-3 text-center">
            Copyright 2021 by Moghan Kumar. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    list: state.watchlist.list || [],
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    watchlist: (list) => {
      dispatch(watchlist(list));
    },
  };
};
export default connect(mapStatetoProps, mapDispatchtoProps)(MovieDetails);
