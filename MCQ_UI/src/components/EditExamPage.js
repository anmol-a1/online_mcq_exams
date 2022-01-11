import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const EditExamPage = (props) => {
    const history=useNavigate();
    const { state } = useLocation();
    console.log(state);
    const [formData, updateFormData] = useState(state);
    const [load, setload] = useState(false);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const addexam = async () => {
            const was = await fetch('http://127.0.0.1:8000/teacher/editexam/'+formData.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subname:formData.subname ,
                    hoster:formData.hoster ,
                    stream:formData.stream,
                    date:formData.date ,
                    year:formData.year,
                    starttime:formData.starttime ,
                    endtime:formData.endtime ,
                })
            })
            let ds=await was.json();
            setload(true);
            props.showalert("Exam details changed successfully","success");
            history('/questions', {
                state: {
                    examid:formData.id
                }
            });
        }
        addexam();
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="nav-link" to="/teacherhomepage" state={{ email: "", id: "", user_name: "" }}>
                    Home
                </Link>
            </nav>
            <div className="container">
                <form>
                    <div className="form-row my-3">
                        <div className="col-md-4 mb-4">
                            <label htmlFor="appt">Subject Name </label>
                            <input

                                className="mx-3 col-lg-5"
                                onChange={handleChange}
                                type="text"
                                id="appttext"
                                name="subname"
                                value={formData.subname}
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <select  value={formData.year} className="custom-select custom-select-sm" name="year" id="year" onChange={handleChange}>
                                <option  disabled>Choose a Year ...</option>

                                <option value="FE">FE</option>
                                <option value="SE">SE</option>
                                <option value="TE">TE</option>
                                <option value="BE">BE</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <select  value={formData.stream} className="custom-select custom-select-sm" name="stream" id="stream" onChange={handleChange}>
                                <option  disabled>Choose a Stream..</option>

                                <option value="Computer">Computer</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Civil">Civil</option>
                                <option value="IT">IT</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Printing">Printing</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row my-3">
                        <div className="col-md-4 mb-4">
                            <label htmlFor="appt">Start time: </label>
                            <input className="mx-3" onChange={handleChange} value={formData.starttime} type="time"  name="starttime" />
                        </div>
                        <div className="col-md-4 mb-4">
                            <label htmlFor="appt">End time: </label>
                            <input className="mx-3" onChange={handleChange} type="time"  value={formData.endtime} name="endtime" />
                        </div>

                        <div className="col-md-4 mb-4">
                            <label htmlFor="appt">Date: </label>
                            <input className="mx-3" type="date" value={formData.date} onChange={handleChange}  name="date" />
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary my-3" type="submit">
                        Submit & Edit Questions
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditExamPage;
