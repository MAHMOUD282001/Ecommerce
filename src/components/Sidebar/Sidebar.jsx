import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSidebarStatus, setSidebarOff } from "../../store/sidebarSlice";
import style from "./Sidebar.module.css";
import {
  fetchAsyncCategories,
  getAllCategories,
} from "../../store/categorySlice";
import { Link } from "react-router-dom";

function Sidebar() {
  let dispatch = useDispatch();

  let categories = useSelector(getAllCategories);

  let isSidebarOn = useSelector(getSidebarStatus);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  return (
    <aside
      className={`${style.sidebar} ${isSidebarOn ? style.hideSidebar : ""}`}
    >
      <div className={style.categoryHeader}>
        <button
          type="button"
          className="hide-btn"
          onClick={() => dispatch(setSidebarOff())}
        >
          <i className="fas fa-times"></i>
        </button>

        <h4 className="mb-0">All Categories</h4>
      </div>
      
      <ul className="d-flex align-items-center flex-column gap-3 mt-2 fw-light">
          {categories.map((category, index) => (
            <li key={index} className={`${style.category}`}>
              <Link
                to={`category/${category}`}
                className={`${style.catLink} text-capitalize`}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
    </aside>
  );
}

export default Sidebar;
