import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { categories } from "../../store/categories";
import { getProductsByCategory } from "../../store/products";
import { Redirect, Link, useParams } from "react-router-dom";
import "./HomePage.css";
import LoginFormPage from "../LoginFormPage";
// import category from "../../backend/db/models/category";

const HomePage = () => {
  // const id = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const categoryObject = useSelector((state) => state.categories);
  const productsByCategory = useSelector((state) => state.products);

  let categoryValues = Object.values(categoryObject);

  let random = Math.floor(Math.random() * categoryValues.length);

  // const difference = random

  // const productCategory = productsByCategory[0].categoryId;
  // const currentCategory = productCategory

  if (categoryValues.length > 4) {
    if (random >= categoryValues.length - 4) {
      random -= 4;
    }

    categoryValues = categoryValues.slice(random, random + 5);
  }

  

  const randomCategory = () => {
    const number = Math.floor(Math.random() * 4);
    return number
  } 
  const thisShoulNotChange = randomCategory();
  console.log(thisShoulNotChange);


  // const randomCategory = categoryValues[randomIndex];

  // const categoryList = [];

  // for(let i = 0; i < 4; i++) {
  //   const val = categoryValues[i];

  //   categoryList.push(val)
  // }
  // console.log(productsByCategory);
  useEffect(() => {
    dispatch(categories());
    dispatch(getProductsByCategory(thisShoulNotChange));
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/login" />;
  //category.map lines 13/14
  return (
    <>
      <div className="banner-1">
        {categoryValues.map((category, idx) => (
          <div className="banner1-img-div" id={`banner1-img${idx}`}>
            <div>
              <Link to={`/categories/${category.id}`}>
                <img className="banner1-img" src={category.img}></img>
              </Link>
            </div>
            <Link
              className="banner-img-text"
              id={`banner-text-${idx}`}
              to={`/categories/${category.id}`}
            >
              <h3>{category.name}</h3>
            </Link>
          </div>
        ))}
      </div>

      {/* <div className="banner1-img-div" id="banner1-img2">
          <img
            className="banner1-img"
            src="https://images.reverb.com/image/upload/s--ji_-4M-n--/f_auto,t_supersize/v1552861911/jwvuegzmrim71w639rol.jpg"
          ></img>
        </div>
        <h3 className="banner-img-text" id="banner-text-2">
          Goodbye
        </h3>
      </div> */}
      <div className="banner-2">
        <h1>Check out some items from our {thisShoulNotChange}</h1>
      </div>
      <div className="banner-3">
        {Array.isArray(productsByCategory)?productsByCategory.map((product, idx) => (
          <div className="banner3-img-div" id={`banner3-img${idx}`}>
            <Link to={`/products/${product.id}`}>
              <img className="banner3-img" src={product.img}></img>
            </Link>
            <Link
              className="banner-img-text"
              id={`banner-text-${idx}`}
              to={`/products/${product.id}`}
            >
              <h3>{product.name}</h3>
            </Link>
          </div>
        )): null}
      </div>
      <div className="banner-4">
        <h1>4</h1>
      </div>
      <div className="banner-5">
        <h1>5</h1>
      </div>
      <div className="banner-6">
        <h1>6</h1>
      </div>
      <div className="banner-7">
        <h1>7</h1>
      </div>
      <div className="banner-8">
        <h1>8</h1>
      </div>
      <div className="banner-9">
        <h1>9</h1>
      </div>
    </>
  );
};

export default HomePage;
