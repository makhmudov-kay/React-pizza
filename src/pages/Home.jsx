import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import LoadingPizza from "../components/PizzaBlock/LoadingPizza";
import SortByPopup from "../components/SortByPopup";
import { setCategory, setSortBy } from "../redux/actions/filter";
import { fetchPizzas } from "../redux/actions/pizza";
import { addPizzaToCart } from "../redux/actions/cart";

const categoryName = [
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
const sortByName = [
  { name: "популярности", type: "popular", order: "desc" },
  { name: "цене", type: "price", order: "desc" },
  { name: "алфавиту", type: "name", order: "asc" },
];

const Home = () => {
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sortBy]);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelecSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj));
  };
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryName}
        />
        <SortByPopup
          activeSortType={sortBy.type}
          items={sortByName}
          onClickSortType={onSelecSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
              <PizzaBlock
                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                onClickAddPizza={handleAddPizzaToCart}
                key={obj.id}
                {...obj}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <LoadingPizza key={index} />)}
      </div>
    </div>
  );
};

export default Home;
