import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import SortByPopup from "../components/SortByPopup";
import { setCategory } from "../redux/actions/filter";

const categoryName = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
const sortByName = [
  { name: "популярности", type: "popular" },
  { name: "цене", type: "price" },
  { name: "алфавиту", type: "alphabet" },
]

const Home = () => {
  const items = useSelector(({pizzas}) => pizzas.items);
  const dispatch = useDispatch();
  
  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index))
  }, [dispatch])

  return (
    <div className="container">
      <div className="content__top">
        <Categories onClickItems={onSelectCategory}
          items={categoryName}
        />
        <SortByPopup
          items={sortByName}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items && items.map((obj) => (
          <PizzaBlock key={obj.id} {...obj} />
        ))}
      </div>
    </div>
  );
};

export default Home;
