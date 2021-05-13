import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Component/Style.css";
import { Route, Switch } from "react-router";
import Home from "./Component/Home";
import MovieDetails from "./Component/MovieDetails";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/movie/:id" component={MovieDetails} exact />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
