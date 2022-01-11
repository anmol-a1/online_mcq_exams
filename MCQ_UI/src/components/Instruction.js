import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
const Instruction = () => {
    const location = useLocation();
    const { userid, examid, minutes, starttime, endtime, passobj,totalmarks,subname} = location.state;
    let strthrs = parseInt(starttime.slice(0, 2));
    let strtmns = parseInt(starttime.slice(3, 5));
    let endhrs = parseInt(endtime.slice(0, 2));
    let endmn = parseInt(endtime.slice(3, 5));
    let lmn = new Date();
    let nowhr = lmn.getHours();
    let nowmn = lmn.getMinutes();
    if (endhrs - nowhr < 0) {
        console.log("");
    }
    else if (endhrs - nowhr === 0 && endmn - nowmn < 0) {
        console.log("");
    }
    else {
        const myvar = setInterval(function () {
            let now = new Date();
            let nowhrs = now.getHours();
            let nowmns = now.getMinutes();
            if (nowhrs - strthrs > 0) {
                try {
                    document.getElementById("tfbtn").classList.remove("disabled");
                    clearInterval(myvar);
                } catch (error) {
                    console.log("")
                }
            }
            else if (nowhrs - strthrs === 0 && nowmns - strtmns >= 0) {

                try {
                    document.getElementById("tfbtn").classList.remove("disabled");
                    clearInterval(myvar);
                } catch (error) {
                    console.log("")
                }
            }
        }, 5000);
    }
    return (
        <div className='container'>
            <p className='my-3' > Start Time: <strong>{starttime}</strong></p>
            <p className='my-3' > End Time : <strong>{endtime}</strong></p>
            <div className='my-3'>
                <div className='my-3'>
                    <strong> <h3>Instructions:</h3></strong> 
                </div>
                <ul className="list-group mx-2">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        You can attempt the question only once.
                        <span className="badge badge-primary badge-pill">1</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        You can go to the next question only after saving the options of current question.
                        <span className="badge badge-primary badge-pill">2</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Do not change the tab during exam.
                        <span className="badge badge-primary badge-pill">3</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        If you face any technical issue during exam, please contact the administrator.
                        <span className="badge badge-primary badge-pill">4</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Exam will automatically end after the timer becomes zero.
                        <span className="badge badge-primary badge-pill">5</span>
                    </li>
                </ul>
            </div>
            <br />
            <Link to="/exampage" state={{ userid: userid, examid: examid, minutes: minutes, passobj: passobj,totalmarks:totalmarks,subname:subname }} className="btn btn-primary centre center btn-sm-2 btn-lg-2 active disabled" id="tfbtn" role="button" aria-pressed="true">Start Exam</Link>

        </div>
    )
}

export default Instruction
