import { Link } from 'react-router-dom'
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import StudentListDiv from './StudentListDiv';
const StudentsList = (props) => {

    // const { state } = useLocation();
    const user = useSelector(state => state.Authreducer.user);
    const { email, id, user_name,stream } = user;
    const [load, setload] = useState(false);
    const [data, setdata] = useState([])
    const form_data = new FormData();
    const changeHandler = (event) => {
        console.log(event.target.files[0]);
        form_data.append('fileuploaded', event.target.files[0]);
        console.log(form_data);

    };
    const [formData, updateFormData] = useState({ name: "", email: "", password: "", year: "", stream: "", rollno: "" });
    const [formData3, updateFormData3] = useState({year3: ""});

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    };
    const handleChange3 = (e) => {
        updateFormData3({
            ...formData3,
            [e.target.name]: e.target.value.trim(),
        })
    };
    const fetchstud = (e) => {
        e.preventDefault();
        props.setprogress(10);
        document.getElementById('listofstudents').classList.remove('invisible');
        props.setprogress(20);
        async function fetchList() {
            let response = await fetch('http://127.0.0.1:8000/teacher/studentlistadded/' + stream + '/'+formData3.year3);
            if(response.status===404){
                props.showalert("select a year", "danger");
                props.setprogress(100);
            }
            else{
            props.setprogress(70);
            let data = await response.json();
            props.setprogress(90);
            setdata(data);
            console.log(data);
            setload(true);
            props.setprogress(100);
            }
        }
        fetchList();
    }

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
        if (formData.password.length >= 8 && formData.name.length >= 3 && ValidateEmail(formData.email)) {
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
                        is_active: true,
                        rel_key: email
                    })
                })
                if(was.status===500){
                    props.showalert("username or email is already registered with us","danger")
                }
                else{
                props.showalert("student added successfully", "success");
                }
                setload(false);
                setload(true);

            }
            signupdata();
        }


    };

    const handleSubmission = async (e) => {
        e.preventDefault();
        let url = 'http://127.0.0.1:8000/auth/fileupload/';
        props.setprogress(50);
        console.log(form_data)
        try{
        const response=await axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        
        
        )
        document.getElementById("filed").value=null;
        } catch(e){
            props.showalert("choosen a file in csv format only","danger");
            props.setprogress(100);
            document.getElementById("filed").value=null;
        }
        
        props.setprogress(100);


    };
    return (

        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">

                    <Link className="nav-link" to="/teacherhomepage" state={{ email: email, id: id, user_name: user_name }}>Home</Link>
                    <Link className="nav-link mx-10" to="/addexam" state={{ email: email, id: id, user_name: user_name }}>Host Exam</Link>
                </nav>
            </div>

            <div className='tushar9'>
                <form style={{ margin: "10px 15px" }}>
                    <div className="row my-3">
                        <div className="col-sm-3">
                            <input type="file" id='filed' enctype="multipart/form-data" name="file" onChange={changeHandler} /></div>
                        <div className="col-sm-3">
                            <button onClick={handleSubmission}>Submit</button>
                        </div>
                    </div>
                </form>
                <p style={{ margin: "5px 15px" }}>Add Student</p>
                <form className='my-3' style={{ margin: "5px 15px" }}>
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <label >Name</label>
                            <input type="text" className="form-control is-valid" name="name" id="name" onChange={handleChange} placeholder="name" required />

                        </div>

                        <div className="col-md-4 mb-3">
                            <label >Email</label>
                            <input type="email" className="form-control is-valid" name="email" id="email" onChange={handleChange} placeholder="email" required />

                        </div>
                        <div className="col-md-4 mb-3">
                            <label >Password</label>
                            <input type="password" className="form-control is-valid" name="password" id="password" onChange={handleChange} placeholder="password" required />

                        </div>
                    </div>
                    <div className="form-row">

                        <div className="col-md-4 mb-3">
                            <select defaultValue={'DEFAULT'} className="custom-select custom-select-sm" name="year" id="year" onChange={handleChange}>
                                <option value="DEFAULT" disabled>Choose a Year ...</option>

                                <option value="FE">FE</option>
                                <option value="SE">SE</option>
                                <option value="TE">TE</option>
                                <option value="BE">BE</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <select defaultValue={'DEFAULT'} className="custom-select custom-select-sm" name="stream" id="stream" onChange={handleChange}>
                                <option value="DEFAULT" disabled>Choose a Stream..</option>

                                <option value="Computer">Computer</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Civil">Civil</option>
                                <option value="IT">IT</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Printing">Printing</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-md-3 mb-2">
                            <label >Roll Number :</label>

                            <input className="mx-3 col-lg-5 is-valid" name="rollno" id="roll_no" onChange={handleChange} placeholder="" required />

                        </div>
                    </div>

                    <button className="btn btn-primary" onClick={handleSubmit} type="submit">Submit form</button>
                </form>
                <form style={{ margin: "5px 15px",textAlign:'center'}}>
                    <div className="form-row">

                        <div className="col-md-4 mb-3">
                            <p>View Added Students :</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <select defaultValue={'DEFAULT'} className="custom-select custom-select-sm" name="year3" id="year3" onChange={handleChange3}>
                                <option value="DEFAULT" disabled>Choose a year..</option>

                                <option value="FE">FE</option>
                                <option value="SE">SE</option>
                                <option value="TE">TE</option>
                                <option value="BE">BE</option>
                            </select>
                        </div>
                        <div className="col-md-3 mb-2">
                           
                        <button className="btn btn-primary" onClick={fetchstud} type="submit">Submit form</button>
                        </div>
                    </div>
                </form>
                <div id='listofstudents' className="container invisible">
                    <p className="my-3">Your Students :</p>
                    <div className="row my-3">
                        <div className="col-sm-3">
                            <label className="visually-hidden">Name</label>

                        </div>
                        <div className="col-sm-4">
                            <label className="visually-hidden">Email</label>

                        </div>
                        <div className="col-sm-2">
                            <label className="visually-hidden">Year</label>

                        </div>
                        <div className="col-sm-2">
                            <label className="visually-hidden">Stream</label>

                        </div>
                    </div>
                    {

                        load ? data.map((element) => (
                            <StudentListDiv key={element.id} setload={setload} showalert={props.showalert} element={element} />
                        )
                        )

                            : <p></p>
                    }
                </div>
            </div >
        </>
    )
}

export default StudentsList
