import { csrfFetch } from "./csrf";

const CART_ADD = "/carts/cartAdd";
const GET_CART = "carts/getCart";
const DELETE_ITEM = "carts/deleteItem";

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

const deleteItem = () => {
  return {
    type: DELETE_ITEM
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

  

  dispatch(getCart(data.cartItems))
}

export const deleteCartItem = (userId, productId) => async(dispatch) => {
  console.log("inside thunk", userId, productId)
  const res = await csrfFetch(`/api/shopping-cart/delete/${userId}/${productId}`, {
    method: "DELETE",
  });
  
  const data = await res.json();

  console.log("deleted item", data)

  // dispatch(deleteItem())
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
    case DELETE_ITEM:
      return state;
    default:
      return state;
  }
};

export default cartsReducer;
