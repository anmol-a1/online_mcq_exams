import React from 'react'
import '../css/start.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { checkAuth } from '../Services/Action'
import { useNavigate } from 'react-router';
import axiosInstance from '../Axios';
import { Link } from 'react-router-dom'
import logo1 from '../images/IMG1.png';
import { useSelector } from 'react-redux'
import { connect } from 'react-redux';
import logo3 from '../images/IMG10.png';
import logo4 from '../images/IMG2.png';
import { useDispatch } from 'react-redux';
const Start = (props) => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const is_auth = useSelector(state => state.Authreducer.isAuthenticated);
    const user = useSelector(state => state.Authreducer.user);
    console.log(is_auth);
    useEffect(() => {
        if (is_auth === true) {
            console.log("hii i am true")
            if (user.isstaff === false) {
                history('/studenthomepage');
            }
            else {
                history('/teacherhomepage');
            }
        }
    }, [user]);

    const [logintext, setlogintext] = useState("")
    const [registertext, setregistertext] = useState("")
    const [formData, updateFormData] = useState({ email: "", password: "" });
    const [formData1, updateFormData1] = useState({ name1: "", email1: "", password: "" });
    const handleChange1 = (e) => {
        updateFormData1({
            ...formData1,
            [e.target.name]: e.target.value.trim(),
        })
    };
    const handleSubmit1 = (e) => {
        e.preventDefault();
        props.setprogress(10);
        console.log(formData1);
        function ValidateEmail(mail) {
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return (true)
            }
            setregistertext("invalid email");
            return (false)
        }
        if (formData1.password.length >= 0 && formData1.name1.length >= 3 && ValidateEmail(formData1.email1)) {
            const signupdata = async () => {
                try {
                    const resp = await axiosInstance.post('auth/create/', {
                        user_name: formData1.name1,
                        first_name: formData1.name1,
                        email: formData1.email1,
                        password: formData1.password,
                        is_active: true
                    });
                    props.setprogress(50);
                    const div = document.querySelector('.modal-backdrop') // Get element from DOM
                    div.classList.remove('modal-backdrop');
                    const div1 = document.querySelector('.fade') // Get element from DOM
                    div1.classList.remove('fade');
                    const div2 = document.querySelector('.show') // Get element from DOM
                    div2.classList.remove('show');
                    props.setprogress(100);
                    history('/');
                    props.showalert("signup success", "success");

                } catch (err) {
                    setregistertext("error occured");
                    props.setprogress(100);
                }
            }
            signupdata();
        }
        else {
            setregistertext("please fill fields correctly");
            props.setprogress(100);

        }


    };
    const handleChange = (e) => {

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    };
    const handleSubmit2 = (e) => {
        const div = document.querySelector('.modal-backdrop') // Get element from DOM
        div.classList.remove('modal-backdrop');
        const div1 = document.querySelector('.fade') // Get element from DOM
        div1.classList.remove('fade');
        const div2 = document.querySelector('.show') // Get element from DOM
        div2.classList.remove('show');
        history('/forgpassemail');
    }

    const handleSubmit = (e) => {
        props.setprogress(10);
        e.preventDefault();
        const loginandgetdata = async () => {
            console.log(formData);
            try {
                const resp = await axiosInstance.post('auth/login/', {
                    email: formData.email,
                    password: formData.password
                });
                props.setprogress(50);
                dispatch({
                    type: 'USER_LOADED_SUCCESS',
                    payload: resp.data
                })
                dispatch({
                    type: 'AUTHENTICATED_SUCCESS'
                })
                localStorage.setItem('access_token', resp.data.access);
                localStorage.setItem('refresh_token', resp.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                document.getElementById("exampleModalCenter").classList.remove("show");
                const div = document.querySelector('.modal-backdrop') // Get element from DOM
                div.classList.remove('modal-backdrop');
                const div1 = document.querySelector('.fade') // Get element from DOM
                div1.classList.remove('fade');
                const div2 = document.querySelector('.show') // Get element from DOM
                div2.classList.remove('show');
                props.setprogress(100);
                if (resp.data.isstaff === true) {
                    history('/teacherhomepage');
                }
                else {
                    history('/studenthomepage');

                }


            } catch (err) {
                setlogintext("Invalid credentials");

                console.log("some error occured");
            }
        }
        loginandgetdata();

    };
    return (
        <>
            <div style={{ height: "100vh" }}>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">


                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/">Online Examination System</Link>
                            </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                            <button class="btn btn-outline-success mx-4 my-2 my-sm-0" type="button" data-toggle="modal" data-target="#exampleModalCenter">Login</button>
                            <button class="btn btn-outline-success mx-4 my-2 my-sm-0" type="button" data-toggle="modal" data-target="#exampleModalCenter1">Register</button>
                        </form>

                    </div>
                </nav>


                <div id="myslideshow" class="carousel slide carousel-fade" data-ride="carousel" >
                    <ol class="carousel-indicators">
                        <li type="button" data-target="#myslideshow" data-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></li>
                        <li type="button" data-target="#myslideshow" data-slide-to="1" aria-label="Slide 2"></li>
                        <li type="button" data-target="#myslideshow" data-slide-to="2" aria-label="Slide 3"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src={logo1} style={{ height: "92vh" }} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src={logo3} style={{ height: "92vh" }} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src={logo4} style={{ height: "92vh" }} class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <a class="carousel-control-prev" role="button" data-target="#myslideshow" data-target="#myslideshow" data-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" role="button" data-target="#myslideshow" data-slide="next">
                        <span class="carousel-control-next-icon"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Login Form</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email</label>
                                        <input name="email" type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                        <small id="emailHelp" className="form-text text-muted"></small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input style={{ border: '2px solid black' }} name="password" type="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <div className="form-group form-check">
                                        <input style={{ fontSize: "20px", color: "black" }} onChange={handleChange} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                    </div>
                                    <p style={{ color: "red" }}>{logintext}</p>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" onClick={handleSubmit2} className="btn btn-primary">Forgot Password ?</button>
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary">login</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Signup Form</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Name</label>
                                        <input type="email" className="form-control" onChange={handleChange1} aria-describedby="emailHelp" name="name1" placeholder="Enter Name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email Address</label>
                                        <input type="email" className="form-control" onChange={handleChange1} aria-describedby="emailHelp" name="email1" placeholder="Enter email" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" onChange={handleChange1} name="password" placeholder="Password" />
                                        <small id="emailHelp" className="form-text text-muted">Password Must be Atleast 8 Letters Long</small>
                                    </div>
                                    <p style={{ color: "red" }}>{registertext}</p>
                                </form>

                            </div>
                            <div class="modal-footer">
                                <button type="submit" onClick={handleSubmit1} className="btn btn-primary">Signup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default Start;
