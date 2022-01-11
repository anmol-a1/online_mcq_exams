import React from 'react'
import { useState } from 'react';
const Questiondiv = (props) => {
    const [deleteload, setdeleteload] = useState(false);
    const handleSubmit = (e) => {
        
        const deletedtudent = async () => {
            try{
            const was = await fetch('http://127.0.0.1:8000/teacher/deleteques/' + props.element.prim_key, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            props.showalert("Question Deleted Successfully", "success");
            setdeleteload(true);
            props.setload(false);
            props.setload(true);
            } catch(error){

            }
        }
        deletedtudent();
    }
    return (
        <>
            <div className='my-2'>
                    <div className="card-header" id={"headingOne"+props.element.prim_key}>
                        <h5 className="mb-0">
                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target={"#collapseOne"+props.element.prim_key} aria-expanded="false" aria-controls={"collapseOne"+props.element.prim_key}>
                                {props.element.ques.slice(0,90)}
                            </button> 
                            <button className="btn collapsed btn-danger" type="button" onClick={handleSubmit}  aria-expanded="true" aria-controls={"collapseOne"+props.element.prim_key}>
                                Delete
                            </button>
                        </h5>
                    </div>

                    <div id={"collapseOne"+props.element.prim_key} className="collapse" aria-labelledby={"headingOne"+props.element.prim_key} data-parent="#accordionExample">
                        <div className="card-body">
                            <p>Correct Option : {props.element.correctoption}</p>
                            <p>Marks : {props.element.marks}</p>
                            <p>Time : {props.element.totaltime}</p>
                        </div>
                    </div>
                    
                    </div>
        </>
    )
}

export default Questiondiv
