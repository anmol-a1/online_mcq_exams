import React from 'react'
import { useLocation } from 'react-router-dom';
import '../css/main.css'
import { useState } from 'react';
import { useEffect } from 'react';
import Questiondiv from './Questiondiv';
const Questions = (props) => {
    const { state } = useLocation();
    const { examid } = state;
    const [load, setload] = useState(false);
    const [data, setdata] = useState([]);
    console.log(examid);
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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        const addques = async () => {
            try {
                const was = await fetch('http://127.0.0.1:8000/teacher/examhostques/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: examid,
                        ques: formData.ques,
                        opt1: formData.opt1,
                        opt2: formData.opt2,
                        opt3: formData.opt3,
                        opt4: formData.opt4,
                        totaltime: formData.totaltime,
                        correctoption: formData.correctoption,
                        marks: formData.marks
                    })
                })
                const sa = await was.json();
                updateFormData({ ques: "", opt1: "", opt2: "", opt3: "", opt4: "", totaltime: "1", correctoption: "2", marks: "1" });
                document.getElementById("ques").value='';
                document.getElementById("opt1").value='';
                document.getElementById("opt2").value='';
                document.getElementById("opt3").value='';
                document.getElementById("opt4").value='';
                setload(false);
                setload(true);
                console.log(sa);

            }
            catch (error) {

            }
        }
        addques();
    }


    return (
        
        <div >
            <div className='container '>
                <div className='container'>
                    <div className='tushar px-2 py-2'>
                        <div className='mx-2 my-2'>
                        <p>
                            <a
                                className="btn btn-primary col-sm-2 col-lg-2"
                                data-toggle="collapse"
                                href='#multiCollapseExample1'
                                role="button"
                                aria-expanded="false"
                                aria-controls="multiCollapseExample1"
                            >
                                Add Question
                            </a>
                        </p>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="collapse collapse" id="multiCollapseExample1">
                                    <form>
                                        <div className="form-group">
                                            <div className="form-row my-3">
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="appt">Questions </label>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="appt">Total Marks : </label>
                                                    <input
                                                        className="mx-3 col-lg-5 "
                                                        type="text"
                                                        onChange={handleChange}
                                                        name="marks"
                                                        placeholder='1'
                                                        value={formData.marks}
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
                                                    <select value={formData.correctoption} onChange={handleChange} name="correctoption" className="custom-select custom-select-sm">
                                                        {/* <option disabled>Correct Option</option> */}
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="ques"
                                                id="ques"
                                                onChange={handleChange}
                                                placeholder="Type your question here"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Option 1</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="opt1"
                                                id="opt1"
                                                onChange={handleChange}
                                                placeholder="option"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Option 2</label>
                                            <input
                                                type="text"
                                                id="opt2"
                                                className="form-control"
                                                name="opt2"
                                                onChange={handleChange}
                                                placeholder="option"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Option 3</label>
                                            <input
                                                type="text"
                                                id="opt3"
                                                className="form-control"
                                                name="opt3"
                                                onChange={handleChange}
                                                placeholder="option"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Option 4</label>
                                            <input
                                                type="text"
                                                id="opt4"
                                                className="form-control"
                                                name="opt4"
                                                onChange={handleChange}
                                                placeholder="option"
                                            />
                                        </div>

                                        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
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
