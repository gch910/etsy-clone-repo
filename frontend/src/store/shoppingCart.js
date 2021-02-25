import { csrfFetch } from "./csrf";

const CART_ADD = "/carts/cartAdd";
const GET_CART = "carts/getCart";

const cartAdd = (cart, cartItems) => {
  return {
    type: CART_ADD,
    payload: {cart, cartItems}
  };
};

const getCart = (cartItems) => {
  return {
    type: GET_CART,
    payload: cartItems
  }
}

export const addToCart = (userId, productId) => async (dispatch) => {
  const res = await csrfFetch(`/api/shopping-cart/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  const data = await res.json();


  dispatch(cartAdd(data.cart, data.cartItems));
};

export const getCartItems = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/shopping-cart/${userId}`);

  const data = await res.json();

  console.log("cart data", data)

  dispatch(getCart(data.cartItems))
}

const initialState = {};

const cartsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CART_ADD:
      newState = {...action.payload}
    //   action.payload.forEach((item) => {
    //     newState[item.id] = item;
    //   });
      return newState;
    case GET_CART:
        newState = {...action.payload }
        return newState;
    default:
      return state;
  }
};

export default cartsReducer;
