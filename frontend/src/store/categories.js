import { csrfFetch } from "./csrf";

const SET_CATEGORIES = "/categories/setCategories";
const RANDOM_CATEGORY = "categories/randomCategory"

const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
};

//  const randomCategory = () => {
//    return {
//      type: RANDOM_CATEGORY,
     
//    }
//  }

export const categories = () => async (dispatch) => {
    const res = await csrfFetch(`/api/categories`);

    const data = await res.json();
    console.log("data:", data);
    dispatch(setCategories(data.categories));
    return res;
}



const initialState = {};

const categoriesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_CATEGORIES: {
      newState = {};
      action.payload.forEach(category => {
          newState[category.id] = category 
      })
    // newState = Object.assign({}, state);
    // newState.categories = action.payload;
      
      return newState;
    }
    default:
      return state;
  }
};

export default categoriesReducer;
