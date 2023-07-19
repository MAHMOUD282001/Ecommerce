import React from 'react'
import style from "./Footer.module.css"
import { Link } from 'react-router-dom'

function Footer() {
  
  
  return (
    <div className={style.footer}>
        <div className='container py-5 text-center'>
            <div className='d-flex align-items-center justify-content-center text-white'>
                <Link to={"/"} className='text-uppercase'>Privacy Policy</Link>
                
                <div className={style.vertLine}></div>
                
                <Link to={"/"} className='text-uppercase'>Term of Service</Link>
                
                <div className={style.vertLine}></div>
                
                <Link to={"/"} className='text-uppercase'>About Ecommerce</Link>
            </div>
            
            <div className='text-white pt-3'>&copy; {new Date().getFullYear()} Ecommerce. All Right Reserved</div>
        </div>
    </div>
  )
}

export default Footer