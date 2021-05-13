import React, { Component } from "react";
import {
  trendingperson,
  toprated,
  popularmovies,
  nowplayingmovies,
} from "../Redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trendingpersons: "",
    };
  }
  componentDidMount() {
    this.props.toprated();
    this.props.trendingperson();
    this.props.popularmovies();
    this.props.nowplayingmovies();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col mt-2">
            <p className="font-weight-bold text-color text-left">
              TRENDING PERSONS ON THIS WEEK....
            </p>
          </div>
        </div>
        <div className="row mt-2">
          {this.props.trending ? (
            this.props.trending.slice(0, 4).map((tr, index) => {
              return (
                <div className="col-md-3 col-sm-6" key={index}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${tr.profile_path}`}
                    alt={tr.name}
                    className="img-fluid rounded-circle mx-auto d-block"
                  />
                  <p className="font-weight-bold text-center">{tr.name}</p>
                  <p className="font-weight-light text-center">
                    Trending for {tr.known_for_department}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="col-md-3 col-sm-6 text-center justify-content-center">
              <p className="font-weight-bold">Loading...</p>
            </div>
          )}
        </div>
        <div className="row mt-2">
          <div className="col">
            <p className="font-weight-bold text-color text-left">
              Running Successfully....
            </p>
          </div>
        </div>
        <div className="row mt-2">
          {this.props.nowplaying ? (
            this.props.nowplaying &&
            this.props.nowplaying.slice(0, 4).map((p, index) => {
              return (
                <div className="col-md-3 col-sm-6 " key={index}>
                  <Link to={`/movie/${p.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${p.poster_path}`}
                      className="img-fluid"
                      alt={p.title}
                    ></img>
                  </Link>
                  <div className="mt-2">
                    <p className="text-left font-weight-bold"> {p.title}</p>
                    <p className="font-weight-light text-left">
                      Release Date : {p.release_date}
                    </p>
                    <p className="text-left">Rating : {p.vote_average}</p>
                    <ReactStars
                      count={p.vote_average}
                      size={20}
                      activeColor={"#ffd700"}
                      color="#ffd700"
                    ></ReactStars>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-md-3 col-sm-6 text-center justify-content-center">
              <p className="font-weight-bold">Loading...</p>
            </div>
          )}
        </div>
        <div className="row mt-2">
          <div className="col">
            <p className="font-weight-bold text-color text-left">
              TOP RATED MOVIES....
            </p>
          </div>
        </div>
        <div className="row mt-2">
          {this.props.toprateds ? (
            this.props.toprateds &&
            this.props.toprateds.slice(1, 5).map((trd, index) => {
              return (
                <div className="col-md-3 col-sm-6 " key={index}>
                  <Link to={`/movie/${trd.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${trd.poster_path}`}
                      className="img-fluid"
                      alt={trd.title}
                    ></img>
                  </Link>
                  <div className="mt-2">
                    <p className="text-left font-weight-bold"> {trd.title}</p>
                    <p className="font-weight-light text-left">
                      Release Date : {trd.release_date}
                    </p>
                    <p className="text-left">Rating : {trd.vote_average}</p>
                    <ReactStars
                      count={trd.vote_average}
                      size={20}
                      activeColor={"#ffd700"}
                      color="#ffd700"
                    ></ReactStars>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-md-3 col-sm-6 text-center justify-content-center">
              <p className="font-weight-bold">Loading...</p>
            </div>
          )}
        </div>
        <div className="row mt-2">
          <div className="col">
            <p className="font-weight-bold text-color text-left">
              POPULAR MOVIES....
            </p>
          </div>
        </div>
        <div className="row mt-2">
          {this.props.popular ? (
            this.props.popular &&
            this.props.popular.slice(0, 8).map((p, index) => {
              return (
                <div className="col-md-3 col-sm-6 " key={index}>
                  <Link to={`/movie/${p.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${p.poster_path}`}
                      className="img-fluid"
                      alt={p.title}
                    ></img>
                  </Link>
                  <div className="mt-2">
                    <p className="text-left font-weight-bold"> {p.title}</p>
                    <p className="font-weight-light text-left">
                      Release Date : {p.release_date}
                    </p>
                    <p className="text-left">Rating : {p.vote_average}</p>
                    <ReactStars
                      count={p.vote_average}
                      size={20}
                      activeColor={"#ffd700"}
                      color="#ffd700"
                    ></ReactStars>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-md-3 col-sm-6 text-center justify-content-center">
              <p className="font-weight-bold">Loading...</p>
            </div>
          )}
        </div>
        <hr className="mt-3" style={{ borderTop: "1px solid #0275d8" }} />
        <div className="mt-3 mb-3">
          Copyright 2021 by Moghan Kumar. All Rights Reserved.
        </div>
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    trending: state.trending.trending,
    toprateds: state.toprated.toprateds,
    popular: state.popularmovies.popular,
    nowplaying: state.nowplayingmovies.nowplaying,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    trendingperson: () => {
      dispatch(trendingperson());
    },
    toprated: () => {
      dispatch(toprated());
    },
    popularmovies: () => {
      dispatch(popularmovies());
    },
    nowplayingmovies: () => {
      dispatch(nowplayingmovies());
    },
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Body);
