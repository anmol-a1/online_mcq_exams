import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
const ExamDetails = (props) => {
    const email = props.email;
    const [formData, updateFormData] = useState(props.element);

    const [load, setload] = useState(false);
    const handleSubmit = (e) => {

        const deletedtudent = async () => {
            let response = await fetch('http://127.0.0.1:8000/teacher/finalizetotaltime/' + props.element.id);
            let response1 = await fetch('http://127.0.0.1:8000/teacher/finalizetotalmarks/' + props.element.id);
            let data = await response.json();
            let data1 = await response1.json();
            const totaltime = data[0].totaltime
            const marks = data1[0].marks
            console.log(formData);
            try {
                const was = await fetch('http://127.0.0.1:8000/teacher/editexam/' + props.element.id, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        subname: formData.subname,
                        hoster: formData.hoster,
                        stream: formData.stream,
                        date: formData.date,
                        year: formData.yeare,
                        starttime: formData.starttime,
                        endtime: formData.endtime,
                        examtotaltime:totaltime,
                        totalmarks:marks
                    })
                })
            }
            catch (error) {

            }

        }
        deletedtudent();
    }
    return (
        <div className="row my-3">
            <div className="col-sm-2">
                <label htmlFor="staticEmail2" className="visually-hidden">{props.element.subname}</label>

            </div>
            <div className="col-sm-3">
                <label htmlFor="inputPassword2" className="visually-hidden">{props.element.year}-{props.element.stream}</label>

            </div>
            <div className="col-sm-3">
                <label htmlFor="inputPassword2" className="visually-hidden">{props.element.date}--{props.element.starttime}</label>

            </div>
            <div className="col-sm-2">
                <Link to="/editexampage" state={props.element} className="btn btn-primary" id='yesorno' role="button" aria-pressed="true">Edit Exam</Link>

            </div>
            <div className="col-sm-2">
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Save Changes</button>
            </div>

            <hr />
        </div>
    )
}

export default ExamDetails
