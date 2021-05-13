import axios from "axios";
import React, { Component } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  Image,
  InputGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: "",
      search: "",
      searchdata: "",
    };
  }

  search(event) {
    event.preventDefault();
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?language=en_IN&api_key=1f6091b9694f5fd0faad141515ed0f90&query=${this.state.search}`
      )
      .then((res) => {
        console.log("Header search:", res.data.results);
        this.setState({ searchdata: res.data.results });
      })
      .catch((err) => {
        console.log("Error in Header search:", err);
      });
  }
  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          sticky
          expand="lg"
          bg="dark"
          variant="dark"
          className="navbar navbar-expand-lg  navbar-light items-center"
        >
          <Link to="/">
            <Navbar.Brand
              style={{ justifyContent: "center", background: "none" }}
            >
              <Image
                src="https://icon-library.com/images/cinema-icon-png/cinema-icon-png-7.jpg"
                alt="Logo"
                style={{ width: "70px", background: "none" }}
              />{" "}
              Movies
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ background: "none" }}
            class="collapse navbar-collapse"
          >
            <Nav className="navbar-nav ml-md-auto">
              <InputGroup className="basic-addon2">
                <FormControl
                  style={{ background: "none" }}
                  placeholder="Movies, Artist, Genre, Language"
                  aria-label="Movies, Artist, Genre, Language"
                  onChange={(event) => {
                    this.setState({
                      search: event.target.value,
                    });
                  }}
                />
                <InputGroup.Append>
                  <Button
                    id="basic-addon2"
                    onClick={this.search.bind(this)}
                    disabled={this.state.search === ""}
                  >
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Nav>

            <Nav as="ul" className="ml-auto" style={{ background: "none" }}>
              <Nav.Link
                as="li"
                href="#home"
                className={
                  this.state.count === 0 ? "nav-item active" : "nav-item "
                }
                style={{ background: "none" }}
                onClick={() => {
                  this.setState({ count: 0 });
                }}
              >
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <DropdownButton
                  menuAlign="right"
                  title="WatchList"
                  id="dropdown-menu-align-right"
                  flip
                  className={
                    this.state.count === 2 ? "nav-item active " : "nav-item"
                  }
                  onClick={() => {
                    this.setState({ count: 2 });
                  }}
                  style={{ background: "none" }}
                >
                  {this.props.list.length == 0 ? (
                    <Dropdown.Item className="HeaderNav">
                      Nothing in WatchList
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item className="HeaderNav">
                      <Link to={`/movie/${this.props.list.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/original/${this.props.list.poster_path}`}
                          alt={this.props.list.title}
                          style={{ width: "100%", height: "100%" }}
                        />
                        <div className="HeaderNav">
                          <p className="text-color font-weight-bold HeaderNav">
                            {this.props.list.title}
                          </p>
                          <p className="HeaderNav">
                            Rating : {this.props.list.vote_average}
                          </p>
                          <p className="HeaderNav">
                            Release Date : {this.props.list.release_date}
                          </p>
                        </div>
                      </Link>
                    </Dropdown.Item>
                  )}
                </DropdownButton>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.state.searchdata !== "" ? (
          <div className="container mt-3">
            {this.state.searchdata.length > 0 ? (
              <p className="font-weight-bold text-color text-left">
                Searched for {this.state.search}
              </p>
            ) : (
              <p>No Data in which you searched title...</p>
            )}

            <div className="row mt-3">
              {this.state.searchdata &&
                this.state.searchdata.slice(0, 17).map((s, index) => {
                  if (s.backdrop_path) {
                    return (
                      <div className="col-md-3 col-sm-6 " key={index}>
                        <Link to={`/movie/${s.id}`}>
                          <img
                            src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
                            className="img-fluid"
                            alt={s.title}
                          ></img>
                        </Link>
                        <div className="mt-2">
                          <p className="text-left font-weight-bold">
                            {s.title}
                          </p>
                          <p className="font-weight-light text-left">
                            Release Date : {s.release_date}
                          </p>
                          <p className="text-left">Rating : {s.vote_average}</p>
                          <ReactStars
                            count={s.vote_average}
                            size={20}
                            activeColor={"#ffd700"}
                            color="#ffd700"
                          ></ReactStars>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    list: state.watchlist.list || [],
    loading: state.watchlist.loading,
  };
};
export default connect(mapStatetoProps)(Header);
