import React from 'react'
import '../css/main.css'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../Axios';
import { Link } from 'react-router-dom'
const TeacherLogin = (props) => {
    const history = useNavigate();
    const [formData, updateFormData] = useState({ email: "ded", password: "23345" });
    const [ischecked, setischecked] = useState(false);

    const handleChange = (e) => {

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })


    };
    const handleChange1=(e)=> {
        setischecked(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(ischecked===true){
        const loginandgetdata = async () => {
            try {
                const resp = await axiosInstance.post('token/', {
                    email: formData.email,
                    password: formData.password
                });
                localStorage.setItem('access_token', resp.data.access);
				localStorage.setItem('refresh_token', resp.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
                props.showalert("Logged in successfully", "success");
                if(resp.data.isstaff===true){
                history('/teacherhomepage', {
                    state: {
                        email: resp.data.email,
                        id: resp.data.id,user_name: resp.data.user_name
                    }
                });
                }
                else{
                    props.showalert("It seems that you are not a admin","danger");
                }
            } catch (err) {
                props.showalert("Please enter valid credentials", "danger");
            }
        }
        loginandgetdata();
        }
        else{
            props.showalert("Please check the checkbox","danger");
        }

    };
    

    return (
        <>
            <div className='abcd1'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/">HOME</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='anmol'>
                <div className="container sm my-3">
                    <div>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email Address :</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" onChange={handleChange} aria-describedby="emailHelp" name="email" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password :</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleChange} name="password" placeholder="Enter Password" />
                                </div>
                            <div className="form-group form-check">
                                    <input onChange={handleChange1}  type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label  className="form-check-label" htmlFor="exampleCheck1">Hereby, I assure that all the information I have entered is correct upto my knowledge.</label>
                                </div>
                            <div className="d-flex justify-content-end">
                                <Link to='/forgpassemail' className='mx-5 my-2' aria-pressed="true" style={{color:"#2b00ff"}}>Forgot Password</Link>
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-sm my-2" >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default TeacherLogin
