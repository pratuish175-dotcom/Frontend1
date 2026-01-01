import React, { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { FaAngleDown } from 'react-icons/fa6';
import Dialog from '@mui/material/Dialog';
import { IoIosSearch } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import Slide from '@mui/material/Slide';
import { MyContext } from '../../App';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CountryDropdown = () => {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [selectedTab, setselectedTab] = useState(null);
  const [countryList, setcountryList] = useState([]);
  const [filteredCountryList, setFilteredCountryList] = useState([]);
  const context = useContext(MyContext);

  // Initialize countryList from context
  useEffect(() => {
    setcountryList(context.countryList || []);
    setFilteredCountryList(context.countryList || []);
  }, [context.countryList]); // Add dependency for dynamic updates

  const selectCountry = (index,country) => {
    setselectedTab(index);
    setisOpenModal(false);
    context.setselectedCountry(country);
  };

  const filterList = (e) => {
    const keyword = e.target.value.toLowerCase();
    if (keyword) {
      const filteredList = countryList.filter((item) =>
        item.country.toLowerCase().includes(keyword)
      );
      setFilteredCountryList(filteredList);
    } else {
      // Reset to original list if search input is cleared
      setFilteredCountryList(countryList);
    }
  };

  return (
    <>
      <Button className="countryDrop" onClick={() => setisOpenModal(true)}>
        <div className="info d-flex flex-column">
          <span className="label">Your Location</span>
          <span className="name">{context.selectCountry!=="" ? context.selectCountry.length>12 ? context.selectCountry?.substr(0,12)+ '...' : context.selectCountry : "Select Location"}</span>
        </div>
        <span className="ml-auto">
          <FaAngleDown />
        </span>
      </Button>
      <Dialog
        open={isOpenModal}
        onClose={() => setisOpenModal(false)}
        className="locationModal"
        TransitionComponent={Transition}
      >
        <h4 className="mb-0">Choose your delivery location</h4>
        <p>Enter your location, and we will specify the offer for your area</p>
        <Button className="close_" onClick={() => setisOpenModal(false)}>
          <MdClose />
        </Button>
        <div className="headerSearch w-100">
          <input
            type="text"
            placeholder="Search your area..."
            onChange={filterList}
          />
          <Button>
            <IoIosSearch />
          </Button>
        </div>
        <ul className="countryList mt-3">
          {filteredCountryList?.length ? (
            filteredCountryList.map((item, index) => (
              <li key={index}>
                <Button
                  onClick={() => selectCountry(index,item.country)}
                  className={`${selectedTab === index ? 'active' : ''}`}
                >
                  {item.country}
                </Button>
              </li>
            ))
          ) : (
            <li>No results found.</li>
          )}
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDropdown;
