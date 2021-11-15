const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const totalSumItem = (obj, param1, param2) => {
  if (param1 !== null) {
    return Object.keys(obj).reduce(
      (sum, key) => obj[key][param1].length + sum,
      0
    );
  } else {
    return Object.keys(obj).reduce((sum, key) => obj[key][param2] + sum, 0);
  }
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];
      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const totalCount = totalSumItem(newItems, ["items"]);
      const totalPrice = totalSumItem(newItems, null, ["totalPrice"]);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case "REMOVE_CART_ITEM": {
      const newCartItems = {
        ...state.items,
      };
      const currentTotalPrice = newCartItems[action.payload].totalPrice;
      const currentTotalCount = newCartItems[action.payload].items.length;
      delete newCartItems[action.payload];
      return {
        ...state,
        items: newCartItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    case "PLUS_CART_ITEM": {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      }

      const totalCount = totalSumItem(newItems, ["items"]);
      const totalPrice = totalSumItem(newItems, null, ["totalPrice"]);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    case "MINUS_CART_ITEM": {
      const oldItems = state.items[action.payload].items;
      const newObjItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      }

      const totalCount = totalSumItem(newItems, ["items"]);
      const totalPrice = totalSumItem(newItems, null, ["totalPrice"]);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case "CLEAR_CART":
      return { items: {}, totalPrice: 0, totalCount: 0 };

    default:
      return state;
  }
};

export default cartReducer;
