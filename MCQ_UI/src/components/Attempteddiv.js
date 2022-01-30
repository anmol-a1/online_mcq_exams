import React from 'react'
const Attempteddiv = (props) => {
    return (
        <div>
            <div className="form-row" style={{textAlign:"center"}}>
                <div className="col-md-4 mb-4">
                    <label htmlFor="validationServer01">{props.element1.subname}</label>

                </div>

                <div className="col-md-4 mb-4">
                    <label htmlFor="validationServer02">{props.element1.date}</label>


                </div>
                <div className="col-md-4 mb-4">
                    <label htmlFor="validationServer02">{props.element1.obtained_marks}</label>
                </div>
            </div>
        </div>
    )
}

export default Attempteddiv
