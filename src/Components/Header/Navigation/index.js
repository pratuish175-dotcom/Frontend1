import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { MyContext } from "../../../App";

const Navigation = () => {
  const { subCategoryData } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="premium-nav">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT – CATEGORY BUTTON */}
          <div className="col-md-3 nav-left">
            <Button
              className={`allCatBtn ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <IoIosMenu className="icon" />
              <span>All Categories</span>
              <FaAngleDown className={`arrow ${isOpen ? "rotate" : ""}`} />
            </Button>

            {/* SIDEBAR */}
            <div className={`category-sidebar ${isOpen ? "show" : ""}`}>
              <ul>
                {subCategoryData?.map((item) => (
                  <li key={item._id}>
                    <Link to={`/cate/${item._id}`} onClick={() => setIsOpen(false)}>
                      <span>{item.name}</span>
                      <FaAngleRight />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT – MAIN NAV */}
          <div className="col-md-9 nav-right">
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>

              {subCategoryData?.map((item) => (
                <li key={item._id}>
                  <Link to={`/cate/${item._id}`}>{item.name}</Link>
                </li>
              ))}

              {/* SUPER SAVER */}
              <li className="super-saver">
                <Link to="/deals">🔥 Super Saver</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navigation;
