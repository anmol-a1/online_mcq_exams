import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
const Instruction = (props) => {
    const dispatch = useDispatch();
    const tempexam = useSelector((state) => state.Authreducer.tempdetails);
    const { examid, subname, starttime, endtime, minutes, totalmarks } = tempexam;
    const examdetails = useSelector(state => state.ExamReducer.examdetails);
    const user = useSelector(state => state.Authreducer.user);
    const [first, setfirst] = useState(true);
    let lmn = new Date();
    let nowhr = lmn.getHours();
    let nowmn = lmn.getMinutes();
    let strthrs = parseInt(starttime.slice(0, 2));
    let strtmns = parseInt(starttime.slice(3, 5));
    let endhrs = parseInt(endtime.slice(0, 2));
    let endmn = parseInt(endtime.slice(3, 5));
    const history = useNavigate();
    useEffect(() => {

    }, [examid]);
    const examattempt = useSelector((state) => state.ExamReducer.isattempted);
    const oldexam = async (e) => {
        if (examid !== examdetails.examid) {
            let endhrs1 = parseInt(examdetails.endtime.slice(0, 2));
            let endmn1 = parseInt(examdetails.endtime.slice(3, 5));
            if (endhrs1 > nowhr) {
                let isExecuted = window.confirm("your previous attempted exam is not submitted it,are you want to quit that one and continue this?");
                console.log(isExecuted)
                if (isExecuted === true) {
                    dispatch({
                        type: 'INITIALIZE_EXAM_DETAILS'
                    })
                    
                    newexam();

                }
                else {
                    console.log("fgds")
                }

            }
            else if (endhrs1 == nowhr && endmn1>nowmn) {
                let isExecuted = window.confirm("Are you sure to execute this action?");
                console.log(isExecuted)
                if (isExecuted === true) {
                    dispatch({
                        type: 'INITIALIZE_EXAM_DETAILS'
                    })
                    newexam();

                }
                else {
                    console.log("fgds")
                }

            }
            else {
                dispatch({
                    type: 'INITIALIZE_EXAM_DETAILS'
                })
                newexam();

            }
        }
        else {
            console.log("i am attaemperd even also clearing");
            history("/exampage");
        }

    }
    const newexam = async (e) => {

        const examdata = {
            examid: examid,
            minutes: minutes,
            totalmarks: totalmarks,
            subname: subname,
            starttime:starttime,
            endtime:endtime
        };
        console.log(examdata);
        dispatch({
            type: "LOAD_EXAM_DETAILS",
            payload: examdata,
        });
        // props.setprogress(20);
        let response = await fetch(
            "http://127.0.0.1:8000/student/checkingattempt/" +
            user.id +
            "/" +
            examid
        );
        // props.setprogress(40);
        let datas = await response.json();
        console.log(datas);
        if (datas.length > 0) {
            dispatch({
                type: "UPDATE_MINUTES",
                payload: datas[0].minutes,
            });
            dispatch({
                type: "UPDATE_MARKS",
                payload: datas[0].marksupdate,
            });
            dispatch({
                type: "ONEXAMUPDATE",
                payload: datas[0].id,
            });
            async function fetchExamUpcoming() {
                let response1 = await fetch(
                    "http://127.0.0.1:8000/student/examsquestions/" + examid
                );
                // props.setprogress(70);
                let data = await response1.json();
                console.log(data);
                data = data.sort(() => user.random_num - 0.5);
                dispatch({
                    type: "LOAD_QUESTIONS",
                    payload: data,
                });
                var a = datas[0].markedques.split("");
                // props.setprogress(90);
                dispatch({
                    type: "MARKED_QUESTIONS",
                    payload: a,
                });
                dispatch({
                    type: "IS_ATTEMPTED",
                });
                // props.setprogress(100);
                history("/exampage");
            }
            fetchExamUpcoming();
        } else {
            console.log("hii");
            async function fetchExamUpcoming() {
                let response = await fetch(
                    "http://127.0.0.1:8000/student/examsquestions/" + examid
                );
                // props.setprogress(70);
                let data = await response.json();
                data = data.sort(() => user.random_num - 0.5);
                var array = [];
                for (var i = 0; i < data.length; ++i) {
                    array.push(0);
                }
                const abc = "000000000";
                const was = await fetch(
                    "http://127.0.0.1:8000/student/initializedata/",
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            exam_id: examid,
                            student_id: user.id,
                            markedques: abc,
                            minutes: minutes,
                        }),
                    }
                );
                // props.setprogress(90);
                let ds = await was.json();
                dispatch({
                    type: "ONEXAMUPDATE",
                    payload: ds.id,
                });
                dispatch({
                    type: "MARKED_QUESTIONS",
                    payload: array,
                });
                dispatch({
                    type: "LOAD_QUESTIONS",
                    payload: data,
                });
                dispatch({
                    type: "UPDATE_MINUTES",
                    payload: minutes,
                });
                dispatch({
                    type: "IS_ATTEMPTED",
                });
                // props.setprogress(100);
                history("/exampage");
            }
            fetchExamUpcoming();

        }

    }
    const gotoexam = async (e) => {
        e.preventDefault();
        if(examattempt===false){
        newexam();           
        }
        else{
        oldexam();
        }

    };


    if (endhrs - nowhr < 0) {
        console.log(endhrs, nowhr);
        console.log(starttime);
    } else if (endhrs - nowhr === 0 && endmn - nowmn < 0) {
        console.log("");
    } else {
        const myvar = setInterval(function () {
            let now = new Date();
            let nowhrs = now.getHours();
            let nowmns = now.getMinutes();
            if (nowhrs - strthrs > 0) {
                try {
                    setfirst(false);
                    clearInterval(myvar);
                } catch (error) {
                    console.log("");
                }
            } else if (nowhrs - strthrs === 0 && nowmns - strtmns >= 0) {
                try {
                    clearInterval(myvar);
                } catch (error) {
                    console.log("");
                }
            }
        }, 3000);
    }
    return (
        <>
            <div className="container my-4">
                <button className="btn btn-primary btn-sm-2 btn-lg-2 " id={"yesorno" + examid} onClick={gotoexam} disabled={first}> Attempt</button>
            </div>
        </>
    );
};

export default Instruction;
