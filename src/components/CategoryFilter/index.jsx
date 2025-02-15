import React from "react";
import { Link } from "react-router-dom";
import "./CategoryFilter.css"; 

const CategoryFilter = ({ products, setCategory }) => {
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="category-filter">
      <ul className="category-list">
        <li>
          <Link to="/" onClick={() => setCategory(null)} className="category-link">
            Todos los productos
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <Link
              to={`/categoria/${category}`}
              onClick={() => setCategory(category)}
              className="category-link"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
