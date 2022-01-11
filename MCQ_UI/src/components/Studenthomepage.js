import React from 'react'
import axiosInstance from '../Axios';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import { Upcomingdiv } from './Upcomingdiv';
import Attempteddiv from './Attempteddiv';
import { useNavigate } from 'react-router-dom';
const Studenthomepage = (props) => {
    const history = useNavigate();
    const [data, setdata] = useState(null)
    const [data1, setdata1] = useState(null)
    const { state } = useLocation();
    const { email, year, stream, id, user_name, name } = state;
    var { reloadloca } = state;
    const passobj = {
        email: email,
        year: year,
        stream: stream,
        id: id,
        user_name: user_name
    }
    const [load, setload] = useState(false);
    useEffect(() => {
        async function fetchExamUpcoming() {

            let response = await fetch('http://127.0.0.1:8000/student/upcomingexams/' + year + '/' + stream);
            let response1 = await fetch('http://127.0.0.1:8000/student/attempteddetails/' + id);
            let data = await response.json();
            let data1 = await response1.json();
            setdata1(data1);
            setdata(data);
            setload(true);
        }
        fetchExamUpcoming();
    }, [load, stream, year, id])
    const handleSubmit = async (e) => {

        try {
            const abcd = await axiosInstance.post('logout/blacklist/', {
                refresh_token: localStorage.getItem('refresh_token'),
            });
            console.log(abcd);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            props.showalert("logged out successfully", "danger");
            history('/');
        } catch (error) {
            console.log(error);
        }
    }
    if (reloadloca === true) {
        setTimeout(() => {
            window.open("http://localhost:3000/", "_self");
        }, 10000);

    }
    return (

        <>
            <div className='abcd1'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active"> <p>{name}  {user_name}</p>
                            </li>
                        </ul>

                    </div>

                    <button className="btn btn-outline-danger" onClick={handleSubmit} type="submit">Logout</button>
                </nav>
                <div className="container ">
                    <div class="card my-4">
                        <div class="card-header">
                            Exams Schedule
                        </div>
                        <div class="card-body px-2 py-2" style={{ backgroundColor: "#00AEFF" }}>
                            <div className="form-row ">
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="validationServer01">Subject</label>

                                </div>

                                <div className="col-md-2 mb-2">
                                    <label htmlFor="validationServer02">Exam Duration</label>


                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="validationServer02">Start-Time</label>
                                </div>
                                <div className="col-md-2 mb-2">
                                    <label htmlFor="validationServer02">End-Time</label>
                                </div>
                            </div>
                            {

                                load ? data.map((element) => (
                                    <Upcomingdiv id={id} key={element.id} passobj={passobj} element={element} />

                                )
                                )

                                    : <p>Nothing Yet Scheduled</p>
                            }
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            Exam History
                        </div>
                        <div class="card-body px-2 py-2" style={{ backgroundColor: "#00AEFF" }}>
                            

                            <p className="my-3">Attempted Exams :</p>
                            <div className="form-row">
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="validationServer01">Subject</label>

                                </div>

                                <div className="col-md-2 mb-2">
                                    <label htmlFor="validationServer02">Date</label>


                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="validationServer02">Marks</label>
                                </div>
                                <div className="col-md-2 mb-2">
                                    <label htmlFor="validationServer02">Result</label>
                                </div>
                            </div>

                            {

                                (load && (data1.length > 0)) ? data1.map((element1) => (
                                    < Attempteddiv key={element1.id} element1={element1} />

                                )
                                ) : <p></p>

                            }
                        </div>
                    </div>
                </div>
            </div>
           
        </>

    )
}

export default Studenthomepage
