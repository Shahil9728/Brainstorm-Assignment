import React from 'react'
import Rockets from '../assets/rocket.jpg'
import './Banner.css'

const Banner = () => {
    return (
        <div className='bannerdiv'>
            <div className="left">
                <h1>
                    Exploring the Universe, Together.
                </h1>
                <p>
                    Pushing boundaries, inspiring humanity, shaping our future among the stars.
                </p>
                <button className="button readbtn">Read More</button>
            </div>
        </div>
    )
}

export default Banner