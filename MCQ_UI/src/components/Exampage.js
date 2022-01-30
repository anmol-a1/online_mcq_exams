import React from 'react'
import '../css/exampage.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const Exampage = (props) => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const exam_info = useSelector(state => state.ExamReducer);
    const { examdetails, questions, currentquestion, markedques, isattempted, minutes, onexamid } = exam_info;
    const user = useSelector(state => state.Authreducer.user);
    console.log(examdetails, questions, currentquestion, markedques, isattempted, minutes);
    const [MyArray, setMyArray] = useState([]);
    const totalquestions = questions.length;
    console.log(minutes);
    const { examid, totalmarks, subname } = examdetails;
    useEffect(() => {
        setMyArray([]);
        for (let i = 1; i <= totalquestions; i++) {
            setMyArray(oldArray => [...oldArray, i]);
            console.log("hey i am called");
        }
        const interval = setInterval(async () => {
            dispatch({
                type: 'DECREMENT_MINUTES'
            })
            var stri = '';
            var totmarks=0;
            for (var i = 0; i < totalquestions; i++) {
                stri += markedques[i];
                if(parseInt(markedques[i])===questions[i].browsetime){
                    totmarks=totmarks+questions[i].marks;
                    console.log("correct");
                }
            }
            console.log(minutes);
            const was = await fetch('http://127.0.0.1:8000/student/examupdate/' + onexamid, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'exam_id': examid,
                    'student_id': user.id,
                    'markedques': stri,
                    'minutes': minutes,
                    'marksupdate':totmarks
                })
            })
        }, 60000);
        return () => {
            clearInterval(interval);
        };
    }, [totalquestions, minutes]);
    const quesno = useRef(currentquestion);
    let dta = parseInt(0);
    const marks = useRef(dta);

    const [load, setload] = useState(false);
    const [element, setelement] = useState(questions[currentquestion - 1]);

    console.log(markedques);
    const savechangeques = (e) => {
        var radio = document.querySelector('input[type=radio][name=chc]:checked');
        if (radio != null) {
            console.log(questions[currentquestion-1].browsetime);
            console.log(typeof(questions[currentquestion-1].browsetime))
            console.log(radio.value);
            console.log(typeof(radio.value));
            dispatch({
                type: 'UPDATE_MARKEDQUES',
                payload: radio.value
            })
            radio.checked = false;
        }


    }
    const changeques = (e) => {

        setelement(questions[currentquestion]);
        dispatch({
            type: 'CURRENT_QUES_PRO'
        })

    }

    const backques = (e) => {
        setelement(questions[currentquestion - 2]);
        dispatch({
            type: 'CURRENT_QUES_BACK'
        })
        


    }
    const submit = async () => {
        var totmarks=0;
        props.setprogress(10);
        for (var i = 0; i < totalquestions; i++) {
            console.log((markedques[i])+"    "+questions[i].browsetime);
            if(parseInt(markedques[i])===questions[i].browsetime){
                totmarks=totmarks+questions[i].marks;
                console.log("correct");
            }
        }
        props.setprogress(20);
        const was =await fetch('http://127.0.0.1:8000/student/postresult/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subname: subname,
                exam_id: examid,
                obtained_marks: totmarks,
                student_id: user.id,
                roll_no: user.user_name,
                first_name: user.first_name
            })
        })
        props.setprogress(70);
        setTimeout(function () {
            props.showalert("your test submitted succesfully", "success");
            dispatch({
                type: 'INITIALIZE_EXAM_DETAILS'
            })
        }, 3000);
        props.setprogress(100); 
        history('/');

    }
    if (minutes < 0) {
        submit();
    }
    return (
        <>{
            (element !== null) &&
            (
                <div className='abcd7'>
                    <div id="redtime" className="uppertime">
                        <p className='tushar4'>Question No: {currentquestion} </p>
                        <p className='tushar3'>Time Reamining : <span id="timeremain">{minutes}</span> </p>
                    </div>
                    <div className='mainbox'>


                        <div className="lowerdiv">

                            <p className='saga'>Questions</p>
                            <div className="markingques">
                                {MyArray.map(animal => (
                                    <div id={"lowerques" + animal} key={animal} className={(markedques[animal - 1] === 0 || markedques[animal - 1] === "0") ? 'innermarkingques' : 'innermarkingques1'}>
                                        <p>{animal}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="maindiv">
                            <div className="upperdiv">
                                <div className="upperques">
                                    <p className="topques">Q  .{element.ques}</p>
                                    <img src={element.quesimg} style={{maxHeight:"250px",maxWidth:"500px"}}  alt="" />
                                </div>
                                <div className="chcg">
                                    <div className="choicesblock">
                                        {/* <p className="choicesspan">A</p> */}
                                        <p className="optionsofexam">{element.opt1}</p>
                                        <input checked={markedques[currentquestion - 1] === ("1" || 1)} onClick={savechangeques} className="insradio" name="chc" type="radio" value={1} />
                                    </div>
                                    <img src={element.opt1img}  style={{maxHeight:"250px",maxWidth:"500px"}}  alt="" />
                                    <div className="choicesblock">
                                        {/* <p className="choicesspan">B</p> */}
                                        <p className="optionsofexam">{element.opt2}</p>
                                        <input checked={markedques[currentquestion - 1] === ("2" || 2)} onClick={savechangeques} className="insradio" name="chc" type="radio" value={2} />
                                    </div>
                                    <img src={element.opt2img}  style={{maxHeight:"250px",maxWidth:"500px"}}   alt="" />
                                    <div className="choicesblock">
                                        {/* <p className="choicesspan">C</p> */}
                                        <p className="optionsofexam">{element.opt3}</p>
                                        <input checked={markedques[currentquestion - 1] === ("3" || 3)} onClick={savechangeques} className="insradio" name="chc" type="radio" value={3} />
                                    </div>
                                    <img src={element.opt3img}   style={{maxHeight:"250px",maxWidth:"500px"}}  alt="" />
                                    <div className="choicesblock">
                                        {/* <p className="choicesspan">D</p> */}
                                        <p className="optionsofexam">{element.opt4}</p>
                                        <input checked={markedques[currentquestion - 1] === ("4" || 4)} onClick={savechangeques} className="insradio" name="chc" type="radio" value={4} />
                                    </div>
                                    <img src={element.opt4img}  style={{maxHeight:"250px",maxWidth:"500px"}}   alt="" />
                                </div>

                            </div>
                            <div className='buttonsfather'>
                                <button disabled={currentquestion == 1} className="buttonofsavenext" onClick={backques} type="submit">Previous</button>
                                <button disabled={currentquestion == totalquestions} className="buttonofsavenext" onClick={changeques} type="submit">Next</button>
                                <button disabled={currentquestion !== totalquestions} className="buttonofsavenext" onClick={submit} type="submit">Submit</button>
                            </div>



                        </div>



                    </div>
                </div>

            )

        }
        </>
    )
}

export default Exampage
