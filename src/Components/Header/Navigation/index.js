import Button from '@mui/material/Button';
import { IoIosMenu } from 'react-icons/io';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { MyContext } from "../../../App";

const Navigation = () => {
  const { subCategoryData } = useContext(MyContext);
  const [isopenSidebarVal, setisopenSidebarVal] = useState(false);

  return (
    <nav>
      <div className='container'>
        <div className='row'>
          {/* Sidebar Part */}
          <div className='col-sm-2 navPart1'>
            <div className='catWrapper'>
              <Button 
                className='allCatTab align-items-center' 
                onClick={() => setisopenSidebarVal(!isopenSidebarVal)}
              >
                <span className='icon1 mr-2'><IoIosMenu /></span>
                <span className='text'>ALL CATEGORIES</span>
                <span className='icon2 ml-2'><FaAngleDown /></span>
              </Button>

              {/* Sidebar List */}
              <div className={`sidebarNav ${isopenSidebarVal ? 'open' : ''}`}>
                <ul>
                  {subCategoryData && subCategoryData.length > 0 ? (
                    subCategoryData.map((item) => (
                      <li key={item._id}>
                        <Link to={`/cate/${item._id}`}>
                          <Button>
                            {item.name}
                            <FaAngleRight className="ml-auto" />
                          </Button>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>Loading categories...</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Top Navigation Part */}
          <div className='col-sm-9 navPart2 d-flex align-items-center'>
            <ul className='list list-inline ml-auto'>
              <li className='list-inline-item'>
                <Link to="/">
                  <Button>Home</Button>
                </Link>
              </li>

              {subCategoryData && subCategoryData.length > 0 && (
                subCategoryData.map((item) => (
                  <li className='list-inline-item' key={item._id}>
                    <Link to={`/cate/${item._id}`}>
                      <Button>{item.name}</Button>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
