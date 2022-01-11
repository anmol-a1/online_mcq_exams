import React from 'react'
import { Link } from 'react-router-dom'
const PastExamDetails = (props) => {
    return (
        <div className="row my-3">
                    <div className="col-sm-3">
                        <label htmlFor="staticEmail2" className="visually-hidden">{props.element.subname}</label>

                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="inputPassword2" className="visually-hidden">{props.element.year}-{props.element.stream}</label>

                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="inputPassword2" className="visually-hidden">{props.element.date}--{props.element.starttime}</label>

                    </div>
                    <div className="col-sm-3">
                    <Link to="/resultpage" state={{examid:props.element.id}} className="btn btn-primary" role="button" aria-pressed="true">RESULTS</Link>
                    </div>
                
                <hr />
        </div>
    )
}

export default PastExamDetails
