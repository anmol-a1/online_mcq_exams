import React from 'react'
import axiosInstance from '../Axios';
import { useEffect } from 'react';
import { connectAdvanced, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Upcomingdiv } from './Upcomingdiv';
import Attempteddiv from './Attempteddiv';
import { useNavigate } from 'react-router-dom';
const Studenthomepage = (props) => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.Authreducer.user);
    if(user===null){
        props.showalert("please login","danger");
        history('/');
    }
    const [data, setdata] = useState(null);
    const [data1, setdata1] = useState(null);
    const { year, stream, id, user_name,first_name } = user;
    const [load, setload] = useState(false);
    useEffect(() => {
        async function fetchExamUpcoming() {
            props.setprogress(10);
            let response = await fetch('http://127.0.0.1:8000/student/upcomingexams/' + year + '/' + stream);
            props.setprogress(50);
            let response1 = await fetch('http://127.0.0.1:8000/student/attempteddetails/' + id);
            let data = await response.json();
console.log(data);
            props.setprogress(80);
            let data1 = await response1.json();
            setdata1(data1);
            setdata(data);
            props.setprogress(100);
            setload(true);
        }
        fetchExamUpcoming();
    }, [load, stream, year, id])
    const handleSubmit = async (e) => {
        props.setprogress(50);
        dispatch({
            type: 'LOGOUT_USER'
        })
        props.setprogress(100);
        history('/');
        
    }
    return (

        <>
            <div className='abcd1'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active"> <p>{first_name}  {user_name}</p>
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
                                    <Upcomingdiv id={id} setprogress={props.setprogress} key={element.id} element={element} />

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
                            <div className="form-row" style={{textAlign:"center"}}>
                                <div className="col-md-4 mb-4">
                                    <label htmlFor="validationServer01">Subject</label>

                                </div>

                                <div className="col-md-4 mb-4">
                                    <label htmlFor="validationServer02">Date</label>


                                </div>
                                <div className="col-md-4 mb-4">
                                    <label htmlFor="validationServer02">Marks</label>
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

export default Studenthomepage;
