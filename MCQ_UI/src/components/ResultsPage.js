import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import ResultDiv from './ResultDiv';

const ResultsPage = (props) => {
    const { state } = useLocation();
    const { examid } = state;
    const [data, setdata] = useState([]);
    const [load, setload] = useState(false);
    useEffect(() => {
        async function fetchtresults() {

            let response = await fetch('http://127.0.0.1:8000/teacher/results/' + examid)
            let data = await response.json();
            console.log(data);
            setdata(data);
            setload(true);
        }
        fetchtresults();
    }, [examid])

    return (
        <div className='abcd1'>
        <div className='container my-5'>
            <div className="row my-3">
                <div className="col-sm-4">
                    <label htmlFor="staticEmail2" className="visually-hidden">ROLL NO </label>
                </div>

                <div className="col-sm-4">
                    <label htmlFor="inputPassword2" className="visually-hidden">MARKS SCORED</label>

                </div>
                <div className="col-sm-4">
                    <button type="submit" className="btn btn-primary disabled">RESULT</button>
                </div>

                <hr />
            </div>
            {

                load ? data.map((element) => (
                    <ResultDiv key={element.user_name} element={element} />
                )
                )

                    : <p>Not Attempted By Anyone</p>
            }

        </div>
        </div>
    )
}

export default ResultsPage
