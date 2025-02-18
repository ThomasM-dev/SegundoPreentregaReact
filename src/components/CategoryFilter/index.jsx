import React from "react";
import { Link } from "react-router-dom";
import "./CategoryFilter.css";

const CategoryFilter = ({ products }) => {
  const categories = products.map((product) => product.category);

  const uniqueCategories = [];

  for (let i = 0; i < categories.length; i++) {
    if (!uniqueCategories.includes(categories[i])) {
      uniqueCategories.push(categories[i]);
    }
  }

  return (
    <div className="category-filter">
      <ul className="category-list">
        <li>
          <Link to="/" className="category-link">
            Todos los productos
          </Link>
        </li>
        {uniqueCategories.map((category) => (
          <li key={category}>
            <Link to={`/categoria/${category}`} className="category-link">
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
