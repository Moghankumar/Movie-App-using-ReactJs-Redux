import {
  FETCHMOVIES,
  GENREMOVIES,
  TRENDINGPERSONSUC,
  TRENDINGPERSONREQ,
  TOPRATEDMOVIESUCCESS,
  TOPRATEDMOVIEREQ,
  WATCHLISTREQ,
  WATCHLISTSUCCESS,
  POPULARMOVIESREQ,
  POPULARMOVIESSUCCESS,
  NOWPLAYINGREQ,
  NOWPLAYINGSUCCESS,
} from "./Action";
import { combineReducers } from "redux";

const Reduce = (
  state = {
    data: null,
    genre: null,
    trending: [],
    status: true,
  },
  action
) => {
  switch (action.type) {
    case FETCHMOVIES:
      return {
        data: action.data,
      };
    case GENREMOVIES: {
      return {
        genre: action.genre,
      };
    }
    default:
      return state;
  }
};

const Reduce2 = (
  state = {
    status: true,
    toprateds: [],
  },
  action
) => {
  switch (action.type) {
    case TOPRATEDMOVIEREQ: {
      return {
        loading: true,
      };
    }
    case TOPRATEDMOVIESUCCESS: {
      return {
        loading: false,
        toprateds: action.toprateds,
      };
    }
    default:
      return state;
  }
};
const Reduce3 = (
  state = {
    trending: [],
    status: true,
  },
  action
) => {
  switch (action.type) {
    case TRENDINGPERSONREQ: {
      return {
        status: true,
      };
    }
    case TRENDINGPERSONSUC: {
      return {
        status: false,
        trending: action.trending,
      };
    }
    default:
      return state;
  }
};
const Reduce4 = (
  state = {
    list: [],
    loading: "",
  },
  action
) => {
  switch (action.type) {
    case WATCHLISTREQ: {
      return {
        loading: true,
        list: "",
      };
    }
    case WATCHLISTSUCCESS: {
      return {
        loading: false,
        list: action.list,
      };
    }
    default:
      return state;
  }
};
const Reduce5 = (
  state = {
    popular: [],
    status: true,
  },
  action
) => {
  switch (action.type) {
    case POPULARMOVIESREQ: {
      return {
        status: true,
      };
    }
    case POPULARMOVIESSUCCESS: {
      return {
        status: false,
        popular: action.popular,
      };
    }
    default:
      return state;
  }
};
const Reduce6 = (
  state = {
    nowplaying: [],
    status: true,
  },
  action
) => {
  switch (action.type) {
    case NOWPLAYINGREQ: {
      return {
        status: true,
      };
    }
    case NOWPLAYINGSUCCESS: {
      return {
        status: false,
        nowplaying: action.nowplaying,
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  home: Reduce,
  toprated: Reduce2,
  trending: Reduce3,
  watchlist: Reduce4,
  popularmovies: Reduce5,
  nowplayingmovies: Reduce6,
});

export default rootReducer;
