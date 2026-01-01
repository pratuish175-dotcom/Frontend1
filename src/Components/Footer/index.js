import React from 'react'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'
import { LuShirt } from 'react-icons/lu'
import { TbDiscount, TbTruckDelivery } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <div className='container'>
            <div className='topInfo row'>
                <div className='col d-flex align-items-center'>
                <span><LuShirt/></span>
                <span className='ml-2'>Everyday fresh products</span>


                </div>
                <div className='col d-flex align-items-center'>
                    <span><TbTruckDelivery/></span>
                    <span className='ml-2'>Free delivery for order over $70</span>

                </div>
                <div className='col d-flex align-items-center'>
                    <span><TbDiscount/></span>
                    <span className='ml-2'>Daily Mega Discounts</span>

                </div>

            </div>
            <div className='row mt-4 linksWrap'>
                <div className='col'>
                    <h5>FRUIT & VEGETABLES</h5>
                    <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#">Packaged Product</Link></li>
                        <li><Link to="#">Party Tray</Link></li>
                        
                    </ul>

                </div>
                <div className='col'>
                    <h5>FRUIT & VEGETABLES</h5>
                    <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#">Packaged Product</Link></li>
                        <li><Link to="#">Party Tray</Link></li>
                        
                    </ul>

                </div>
                <div className='col'>
                    <h5>FRUIT & VEGETABLES</h5>
                    <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#">Packaged Product</Link></li>
                        <li><Link to="#">Party Tray</Link></li>
                        
                    </ul>

                </div>
                <div className='col'>
                    <h5>FRUIT & VEGETABLES</h5>
                    <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#">Packaged Product</Link></li>
                        <li><Link to="#">Party Tray</Link></li>
                        
                    </ul>

                </div>
                <div className='col'>
                    <h5>FRUIT & VEGETABLES</h5>
                    <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#">Packaged Product</Link></li>
                        <li><Link to="#">Party Tray</Link></li>
                        
                    </ul>

                </div>
               






            </div>
            <div className='copyright mt-3 pt-3 pb-3 d-flex'>
                <p>Copyrigt 2024. All rights reserved.</p>
                <ul className='list list-inline ml-auto mb-0'>
                    <li className='list-inline-item'>
                        <Link to ="#"><FaFacebookF/></Link>

                    </li>
                    <li className='list-inline-item'>
                        <Link to ="#"><FaInstagram/></Link>

                    </li>
                    <li className='list-inline-item'>
                        <Link to ="#"><FaTwitter/></Link>

                    </li>
                    
                    
                </ul>

            </div>

        </div>
    </footer>
  )
}

export default Footer