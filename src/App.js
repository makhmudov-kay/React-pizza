import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router";
import { useDispatch } from "react-redux";
import { setPizzas } from "./redux/actions/pizza";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    axios.get("http://localhost:3001/pizzas").then(({ data }) => {
      dispatch(setPizzas(data));
    })
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

/* class App extends React.Component {
  componentDidMount() {
    axios.get("http://localhost:3000/db.json").then(({ data }) => {
      this.props.setPizzas(data.pizzas);
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home items={this.props.items} />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    );
  }
} */

export default App;
/* const mapStateToProps = (state) => ({
  items: state.pizzas.items,
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setPizzas: (items) => dispatch(setPizzas(items)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App); */
