import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import ExamDetails from './ExamDetails';
import PastExamDetails from './PastExamDetails';
import '../css/main.css'
const TeacherHomepage = (props) => {
    const { state } = useLocation();
    const { email, id, user_name } = state;
    const [load, setload] = useState(false);
    const [data, setdata] = useState([]);
    const [data1, setdata1] = useState([]);
    console.log(id);
    useEffect(() => {
        async function fetchteacherexam() {

            let response = await fetch('http://127.0.0.1:8000/teacher/examdetails/' + id)
            let response1 = await fetch('http://127.0.0.1:8000/teacher/examdetailspast/' + id)
            let data = await response.json();
            let data1 = await response1.json();
            setdata(data);
            setdata1(data1);
            setload(true);
        }
        fetchteacherexam();
    }, [id])
    return (
        <>
            <div className='abcd2'>
                
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">

                            <Link className="nav-link-active" to="/">Home</Link>

                            <Link className="nav-link mx-10" to="/studentlist" state={{ email: email, id: id, user_name: user_name }} >Your students</Link>
                            <Link className="nav-link mx-10" to="/addexam " state={{ email: email, id: id, user_name: user_name }}>Host Exam</Link>
                            <Link className="nav-link" to="/">Logout</Link>
                        </nav>
                    </div>
                    <div className='tushar'>
                        {/* <div className='card' > */}
                        <div class="card-header">
                            Exams Schedule
                        </div>
                    <div className="container" style={{ backgroundColor: "#00AEFF" }} >
                        {/* <p>Current and Upcoming Exams </p> */}
                        <div className="row">
                            <div className="col-sm-2">
                                <label htmlFor="staticEmail2" className="visually-hidden">Subject</label>

                            </div>
                            <div className="col-sm-3">
                                <label htmlFor="inputPassword2" className="visually-hidden">Year & Branch</label>

                            </div>
                            <div className="col-sm-3">
                                <label htmlFor="inputPassword2" className="visually-hidden">Date & Start Time</label>

                            </div>
                            {/* </div> */}
                        </div>
                        <hr />
                        {
                            (load && data.length > 0) ? data.map((element) => (
                                <ExamDetails key={element.id} email={email} setload={setload} showalert={props.showalert} element={element} />
                            )
                            )
                                : <p></p>
                        }

                    </div>
                    <hr />
                    <div class="card">
                        <div class="card-header">
                            Exam History
                        </div>
                    <div className="container " style={{ backgroundColor: "#00AEFF" }}>
                        {/* <p>Past Exams Assigned by You</p> */}
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="staticEmail2" className="visually-hidden">Subject</label>

                            </div>
                            <div className="col-sm-3">
                                <label htmlFor="inputPassword2" className="visually-hidden">Year & Branch</label>

                            </div>
                            <div className="col-sm-3">
                                <label htmlFor="inputPassword2" className="visually-hidden">Date & Start Time</label>

                            </div>
                        </div>
                        <hr />
                        {
                            (load && data1.length > 0) ? data1.map((element1) => (
                                <PastExamDetails key={element1.id} setload={setload} showalert={props.showalert} element={element1} />
                            )
                            )
                                : <p></p>
                        }

                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default TeacherHomepage
