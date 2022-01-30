import React from 'react'
import { useLocation } from 'react-router-dom';
import '../css/main.css'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import Questiondiv from './Questiondiv';
const Questions = (props) => {
    const { state } = useLocation();
    const { examid } = state;
    const [load, setload] = useState(false);
    const [data, setdata] = useState([]);
    console.log(examid);
    const form_data = new FormData();
    const [formData, updateFormData] = useState({ ques: "", opt1: "", opt2: "", opt3: "", opt4: "", totaltime: "1", correctoption: "2", marks: "1" });
    useEffect(() => {
        async function fetchList() {
            let response = await fetch('http://127.0.0.1:8000/student/examsquestions/' + examid)
            let data = await response.json();
            setdata(data);
            console.log(data);
            setload(true);
        }
        fetchList();
    }, [examid, load])
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    };
    const handleSubmit1 = (e) => {
        props.setprogress(0);
        props.setprogress(50);
        props.setprogress(100);


    };
    const form_data1 = new FormData();
    const changeHandler4 = (event) => {
        console.log(event.target.files[0]);
        form_data1.append('questioncsv', event.target.files[0]);
        console.log(form_data);

    };
    const handleSubmission4 = async (e) => {
        e.preventDefault();
        let url = 'http://127.0.0.1:8000/teacher/questionsupload/';
        props.setprogress(50);
        console.log(form_data1)
        try{
        const response=await axios.post(url, form_data1, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        
        
        )
        document.getElementById("questioncsv").value=null;
        } catch(e){
            props.showalert("choosen a file in csv format only","danger");
            props.setprogress(100);
            document.getElementById("questioncsv").value=null;
        }
        
        props.setprogress(100);


    };

    const changeHandler = (event) => {
        form_data.append(event.target.name, event.target.files[0]);
    };

    const handleSubmission = async (e) => {
        e.preventDefault();
        form_data.append('id', examid);
        form_data.append('ques', formData.ques);
        form_data.append('opt1', formData.opt1);
        form_data.append('opt2', formData.opt2);
        form_data.append('opt3', formData.opt3);
        form_data.append('opt4', formData.opt4);
        form_data.append('correctoption', formData.correctoption);
        form_data.append('totaltime', formData.totaltime);
        form_data.append('marks', formData.marks);
        let url = 'http://127.0.0.1:8000/teacher/examhostques/';
        await axios.post(url, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        updateFormData({ ques: "", opt1: "", opt2: "", opt3: "", opt4: "", totaltime: "1", correctoption: "2", marks: "1" });
        document.getElementById("quesimg").value = null;
        document.getElementById("opt1img").value = null;
        document.getElementById("opt2img").value = null;
        document.getElementById("opt3img").value = null;
        document.getElementById("opt4img").value = null;
        document.getElementById("ques").value = '';
        document.getElementById("opt1").value = '';
        document.getElementById("opt2").value = '';
        document.getElementById("opt3").value = '';
        document.getElementById("opt4").value = '';

    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(formData);
    //     const addques = async () => {
    //         try {
    //             const was = await fetch('http://127.0.0.1:8000/teacher/examhostques/', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     id: examid,
    //                     ques: formData.ques,
    //                     opt1: formData.opt1,
    //                     opt2: formData.opt2,
    //                     opt3: formData.opt3,
    //                     opt4: formData.opt4,
    //                     totaltime: formData.totaltime,
    //                     correctoption: formData.correctoption,
    //                     marks: formData.marks
    //                 })
    //             })
    //             const sa = await was.json();
    //             updateFormData({ ques: "", opt1: "", opt2: "", opt3: "", opt4: "", totaltime: "1", correctoption: "2", marks: "1" });
    //             document.getElementById("ques").value = '';
    //             document.getElementById("opt1").value = '';
    //             document.getElementById("opt2").value = '';
    //             document.getElementById("opt3").value = '';
    //             document.getElementById("opt4").value = '';
    //             setload(false);
    //             setload(true);
    //             console.log(sa);

    //         }
    //         catch (error) {

    //         }
    //     }
    //     addques();
    // }

    // window.addEventListener('blur', (e) => {
    //     console.log("jdfhgfoiudsfhou");
    // });
    return (

        <div >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link mx-10" to="/teacherhomepage"  >Home Page</Link>

                        </li>
                    </ul>

                </div>
                <button className="btn btn-outline-success" onClick={handleSubmit1} type="submit">Done</button>
            </nav>
            <div className='container '>
                <div className='container'>
                    <div className='tushar9 px-2 py-2'>
                    <p style={{ margin: "5px 15px" }}>Exam id : {examid}</p>
                        <form style={{ margin: "10px 15px" }}>
                            <div className="row my-3">
                                <div className="col-sm-3">
                                    <p>Impot Questions :</p></div>
                                <div className="col-sm-3">
                                    <input type="file" id="questioncsv" enctype="multipart/form-data" name="file" onChange={changeHandler4} /></div>
                                <div className="col-sm-3">
                                    <button onClick={handleSubmission4}>Submit</button>
                                </div>
                            </div>
                        </form>
                        <div style={{ margin: "10px 2px" }} className="row">
                            <div className="col">
                                <div>
                                    <form>
                                        <div className="form-group">
                                            <div className="form-row my-1">
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="appt">Total Marks : </label>
                                                    <input className="mx-3 col-lg-5 " type="text" onChange={handleChange} name="marks" placeholder='1' value={formData.marks}
                                                    />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="appt">Total Time : </label>
                                                    <input
                                                        className="mx-3 col-lg-5 "
                                                        type="text"
                                                        onChange={handleChange}
                                                        name="totaltime"
                                                        placeholder='1 min'
                                                        value={formData.totaltime}
                                                    />
                                                </div>
                                                <div className="col-md-2 mb-2">
                                                    <label>Correct Option </label>

                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <select value={formData.correctoption} onChange={handleChange} name="correctoption" className="custom-select custom-select-sm">
                                                        {/* <option disabled>Correct Option</option> */}
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-row my-1">
                                                <div className="col-md-1 mb-1">
                                                    <p>Question</p>
                                                </div>
                                                <div className="col-md-8 ">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="ques"
                                                        id="ques"
                                                        style={{ height: "33px" }}
                                                        onChange={handleChange}
                                                        placeholder="Type your question here"
                                                    />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <input onChange={changeHandler} id='quesimg' type="file" enctype="multipart/form-data" name="quesimg" />
                                                </div>

                                            </div>
                                            <div className="form-row my-1">
                                                <div className="col-md-1 mb-1">
                                                    <p>Option 1</p>
                                                </div>
                                                <div className="col-md-8 ">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="opt1"
                                                        id="opt1"
                                                        style={{ height: "33px" }}
                                                        onChange={handleChange}
                                                        placeholder="Type your question here"
                                                    />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <input id='opt1img' onChange={changeHandler} type="file" enctype="multipart/form-data" name="opt1img" />
                                                </div>

                                            </div>
                                            <div className="form-row my-1">
                                                <div className="col-md-1 mb-1">
                                                    <p>Option 2</p>
                                                </div>
                                                <div className="col-md-8 ">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="opt2"
                                                        id="opt2"
                                                        style={{ height: "33px" }}
                                                        onChange={handleChange}
                                                        placeholder="Type your question here"
                                                    />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <input id='opt2img' onChange={changeHandler} type="file" enctype="multipart/form-data" name="opt2img" />
                                                </div>

                                            </div>
                                            <div className="form-row my-1">
                                                <div className="col-md-1 mb-1">
                                                    <p>Option 3</p>
                                                </div>
                                                <div className="col-md-8 ">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="opt3"
                                                        id="opt3"
                                                        style={{ height: "33px" }}
                                                        onChange={handleChange}
                                                        placeholder="Type your question here"
                                                    />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <input id='opt3img' onChange={changeHandler} type="file" enctype="multipart/form-data" name="opt3img" />
                                                </div>

                                            </div>
                                            <div className="form-row my-1">
                                                <div className="col-md-1 mb-1">
                                                    <p>Option 4</p>
                                                </div>
                                                <div className="col-md-8 ">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="opt4"
                                                        id="opt4"
                                                        style={{ height: "33px" }}
                                                        onChange={handleChange}
                                                        placeholder="Type your question here"
                                                    />
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <input id='opt4img' onChange={changeHandler} type="file" enctype="multipart/form-data" name="opt4img" />
                                                </div>

                                            </div>

                                        </div>


                                        <button type="submit" onClick={handleSubmission} className="btn btn-primary">
                                            Save
                                        </button >
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="my-2">List of Added Questions :</p>
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                {
                                    (load && data.length > 0) ? data.map((element) => (
                                        <Questiondiv key={element.prim_key} setload={setload} showalert={props.showalert} element={element} />
                                    )
                                    )
                                        : <p>Add Questions From Above</p>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions
