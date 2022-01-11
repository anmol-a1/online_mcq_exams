import React from 'react'
import { Link } from 'react-router-dom'
import '../css/start.css'
import logo1 from '../images/IMG1.png';
import logo3 from '../images/IMG10.png';
import logo4 from '../images/IMG2.png';
import { blue } from '@material-ui/core/colors';

const Start = () => {
    return (
        <>
           
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Online Examination Portal</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link text-primary" to="/login">Student Login</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link text-primary" to="/studentsignup">Student Signup</Link>
                        </li>
                        <li className="nav-item active" style={{ color: "blue" }} >
                            <Link className="nav-link text-primary" to="/teacherlogin">Teacher Login</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link text-primary" to="/teachersignup">Teacher Signup</Link>
                        </li>
                        
                    </ul>

                </div>
            </nav>
           
            <div id="myslideshow" class="carousel slide carousel-fade" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li type="button" data-target="#myslideshow" data-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></li>
                    <li type="button" data-target="#myslideshow" data-slide-to="1" aria-label="Slide 2"></li>
                    <li type="button" data-target="#myslideshow" data-slide-to="2" aria-label="Slide 3"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={logo1} class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                        <img src={logo3} class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                        <img src={logo4} class="d-block w-100" alt="..."/>
                    </div>
                </div>

                <a class="carousel-control-prev" role="button" data-target="#myslideshow"  data-target="#myslideshow" data-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" role="button" data-target="#myslideshow" data-slide="next">
                    <span class="carousel-control-next-icon"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

        </>
    )
}
export default Start
