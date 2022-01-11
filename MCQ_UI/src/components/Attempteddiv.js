import React from 'react'
const Attempteddiv = (props) => {
    return (
        <div>
            <div className="form-row">
                <div className="col-md-3 mb-3">
                    <label htmlFor="validationServer01">{props.element1.name}</label>

                </div>

                <div className="col-md-2 mb-2">
                    <label htmlFor="validationServer02">{props.element1.date}</label>


                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="validationServer02">{props.element1.obtained_marks}</label>
                </div>
                <div className="col-md-2 mb-2">
                    <label htmlFor="validationServer02">{props.element1.result}</label>
                </div>
            </div>
        </div>
    )
}

export default Attempteddiv
