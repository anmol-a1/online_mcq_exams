import React from 'react'
import '../css/main.css'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'

const Studentsignup = (props) => {
    const history = useNavigate();
    const [formData, updateFormData] = useState({ name: "", rollno: "", email: "", year: "", password: "", stream: "",collegecode:"00000000"});

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    };

    const handleSubmit = (e) => {
        console.log(formData);
        e.preventDefault();
        function ValidateEmail(mail) {
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return (true)
            }
            props.showalert("You have entered an invalid email address!", "danger")
            return (false)
        }
        if (formData.password.length >= 8 && formData.name.length >= 3 && ValidateEmail(formData.email) && formData.collegecode==='89751924') {
            const signupdata = async () => {
                const was = await fetch('http://127.0.0.1:8000/auth/create/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_name: formData.rollno,
                        first_name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        year: formData.year,
                        stream: formData.stream,
                        is_active: true
                    })
                })
                props.showalert("Signup successful", "success");
                history('/');
            }
            signupdata();
        }


    };

    return (
        <>
            <div className='abcd1'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/">Home</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='anmol5'>
                    <div className="container sm my-3">

                        <div>
                            <form>
                                <div className="form-group">
                                    <label >Name :</label>
                                    <input type="email" className="form-control" onChange={handleChange} aria-describedby="emailHelp" name="name" placeholder="Enter your name" />
                                </div>
                                <div className="form-group">
                                    <label >E-mail Address :</label>
                                    <input type="email" className="form-control" onChange={handleChange} aria-describedby="emailHelp" name="email" placeholder="Enter your e-mail" />
                                </div>
                                <div className="form-group">
                                    <label >Class Code :</label>
                                    <input type="text" className="form-control" onChange={handleChange} aria-describedby="emailHelp" name="collegecode" placeholder="Enter your class code" />
                                    <small  className="form-text text-muted">If you don't have college code, then contact with your respective exam co-ordinator</small>

                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" onChange={handleChange} name="password" placeholder="Password" />
                                    <small className="form-text text-muted">Password must be atleast 8 letters long</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword2">Roll No :</label>
                                    <input type="number" className="form-control" onChange={handleChange} name="rollno" placeholder="Enter your roll number" />
                                </div>
                                <div className="form-row">

                                    <div className="col-md-6 mb-3">
                                        <select defaultValue={'DEFAULT'} className="custom-select custom-select-sm" name="year" id="year" onChange={handleChange}>
                                            <option value="DEFAULT" disabled>Choose Your Year ...</option>

                                            <option value="FE">FE</option>
                                            <option value="SE">SE</option>
                                            <option value="TE">TE</option>
                                            <option value="BE">BE</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <select defaultValue={'DEFAULT'} className="custom-select custom-select-sm" name="stream" id="stream" onChange={handleChange}>
                                            <option value="DEFAULT" disabled>Choose Your Stream..</option>

                                            <option value="Computer">Computer</option>
                                            <option value="Mechanical">Mechanical</option>
                                            <option value="Civil">Civil</option>
                                            <option value="IT">IT</option>
                                            <option value="Electrical">Electrical</option>
                                            <option value="Printing">Printing</option>
                                            
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-sm my-2">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Studentsignup
