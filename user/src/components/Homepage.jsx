import React from 'react'
import Header from './Header'
import Properties from './Properties'
import Contact from './Contact'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import img1 from './1.jpeg'
import img2 from './2.jpeg'
import img3 from './3.jpg'
import img4 from './4.jpg'


function Homepage() {
  return (
    <div>
      <>


      <div className="page-heading header-text">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
      
        <h3>Home Page</h3>
      </div>
    </div>
  </div>
</div>




<div className="floating-images-container">
        <h2 className="section-title">Explore Our Box Cricket Turfs</h2>
        <div className="floating-images">
          <div className="image-item">
            <img src={img1} alt="Cricket Turf 1" />
          </div>
          <div className="image-item">
            <img src={img2} alt="Cricket Turf 2" />
          </div>
          <div className="image-item">
            <img src={img3} alt="Cricket Turf 3" />
          </div>
          <div className="image-item">
            <img src={img4} alt="Cricket Turf 4" />
          </div>
        </div>
      </div>

  {/* ***** properties Area Start ***** */}
  <Properties/>
  {/* ***** properties Area End ***** */}



  {/* ***** Contact Area Start ***** */}
  <Contact/>
  {/* ***** Contact Area End ***** */}
  


  {/* ***** Footer Area Start ***** */}
  {/* ***** Footer Area End ***** */}
  
  {/* Scripts */}
  {/* Bootstrap core JavaScript */}
</>

    </div>
  )
}

export default Homepage
