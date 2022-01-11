import React from 'react'

const ResultDiv = (props) => {
    return (
        
            <div className="row my-3">
                <div className="col-sm-4">
                    <label htmlFor="staticEmail2" className="visually-hidden">{props.element.user_name}</label>
                </div>
                <div className="col-sm-4">
                    <label htmlFor="staticEmail2" className="visually-hidden">{props.element.obtained_marks}</label>

                </div>
                <div className="col-sm-4">
                    <button type="submit" className="btn btn-primary disabled">{props.element.result}</button>
                </div>

                <hr />
            </div>

      
    )
}

export default ResultDiv
