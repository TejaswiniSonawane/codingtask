import React, {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import 'rc-time-picker/assets/index.css';

import './formstyle.css'

function Formpage() {
    const history = useHistory();
    const [NewEmp, setNewEmp] = useState([]); // if you want to save the added records in array
    const [Name, setName] = useState('');
    const [Salary,setSalary] = useState('');
    const [Age,setAge] = useState('');

    const clearDetails = () => {
        setName('');
        setSalary('');
        setAge('');
    };

    const addDetails = () => {
        if(Name.length > 0 && Salary.length > 0 && Age.length > 0)
        {
            const formvalues = {
                name: Name,
                salary: Salary,
                age: Age
            };
            console.log('formvalues-', formvalues);
            const config = {
                headers: {
                        'Access-Control-Allow-Origin':'*',
                        'Access-Control-Allow-Headers':'*',
                        'Content-type': 'application/json',
                    },
                data: formvalues,
            };
            axios.post(`/create`,config)
            .then((res)=>{
                console.log('res-', res.data);
                setName('');
                setSalary('');
                setAge('');
                // setNewEmp([
                //         ...NewEmp,res.data
                //     ]);
                swal("Added!", "Your record added Successfully!", "success");
            })
            .catch((e)=>{
                console.log('error-', e);
                swal("Oops!", "Something went wrong!", "error");
                setName('');
                setSalary('');
                setAge('');
            });
        }
        else{
            alert('Please Enter the all Details!');
        }
    };

return (
    <div>
        <div className="container">
            <div className="col-lg-12">
            <h3 className="my-5"> New Employee Form</h3>
            </div>
            <div className="col-lg-12">
                <div className='border rounded-lg p50' style={{textAlign:"left"}}>
                        <label className="lableCss">Name : </label>
                        <input
                        className="inputBox"
                            type='text'
                            name='name'
                            onChange={(e)=> setName(e.target.value)}
                            placeholder='Enter Name'
                            value = {Name}
                        />
                    {/* salary */}
                        <label className="lableCss">Salary : </label>
                        <input
                        className="inputBox"
                            type='number'
                            name='salary'
                            onChange={(e)=> setSalary(e.target.value)}
                            value = {Salary}
                            placeholder='Enter Salary'
                        />
                    {/* age */}
                        <label className="lableCss">Age : </label>
                        <input
                        className="inputBox"
                            type='number'
                            name='age'
                            onChange={(e)=> setAge(e.target.value)}
                            value = {Age}
                            placeholder='Enter Age'
                        />
                 <button className="btn btn-primary btnCss" onClick={()=> addDetails()} > Submit </button>
                 <button className="btn btn-primary btnCss" onClick={()=> clearDetails()} > Clear </button>
                    <button className="btn btn-default backCss" onClick={() => {
                            history.goBack()
                    }}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    </div>
);
}

export default Formpage;