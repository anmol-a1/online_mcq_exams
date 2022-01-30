import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
export const Upcomingdiv = (props) => {
    const id = props.id;
    const dispatch = useDispatch();
    const history = useNavigate();
    const gotoexam = async (e) => {
       e.preventDefault();
       const tempdata = {
        examid: props.element.id,
        minutes: props.element.examtotaltime,
        totalmarks: props.element.totalmarks,
        subname: props.element.subname,
        starttime:props.element.starttime,
        endtime:props.element.endtime
      };
      console.log(tempdata);
      dispatch({
        type: "INITIATE_TEMP_DETAILS",
        payload: tempdata,
      });
       history('/instruction')
    }
  
    useEffect(() => {
        // props.setprogress(0);
        async function check() {
            let response = await fetch('http://127.0.0.1:8000/student/checking/' + id + '/' + props.element.id);
            if (response.status === 400) {
                try {
                    var element = document.getElementById("yesorno" + props.element.id);
                    element.parentNode.removeChild(element)
                } catch (error) {

                }
            }
        }
        // props.setprogress(100);
        check();
    }, [id, props.element.id]);
    return (
        <div>
            <div className="form-row">
                <div className="col-md-3 mb-3">
                    <label htmlFor="validationServer01">{props.element.subname}</label>

                </div>

                <div className="col-md-2 mb-2">
                    <label htmlFor="validationServer02">{props.element.examtotaltime} min</label>


                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="validationServer02">{props.element.starttime}</label>
                </div>
                <div className="col-md-2 mb-2">
                    <label htmlFor="validationServer02">{props.element.endtime}</label>
                </div>
                <div className="col-md-2 mb-2">
                    <button className="btn btn-primary btn-sm-2 btn-lg-2 "  id={"yesorno" + props.element.id} type="button" onClick={gotoexam}>Attempt</button>
                </div>
            </div>
            

        </div>

    )
}
