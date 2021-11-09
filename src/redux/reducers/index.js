import { combineReducers } from "redux";
import filterReducer from "./filter";
import pizzasReducer from "./pizza";

const rootReducer = combineReducers({
    filters: filterReducer,
    pizzas: pizzasReducer
})

export default rootReducer;