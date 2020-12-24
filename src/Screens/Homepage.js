import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import 'rc-time-picker/assets/index.css';


function Homepage() {
    const [listData, setListData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get('/employees');
        //   console.log('result----------', result);
          setListData(result.data.data);
        };
        fetchData();
      }, []);

    const deleteDetails = async(indexData) => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this employee record?",
            icon: "warning",
            dangerMode: true,
          });
           
          if (willDelete) {
              const url = `/delete/${indexData}`;
            axios.delete(url)
            .then(() =>{
                const newlist = listData.filter((e)=> e.id !== indexData);
                setListData(newlist);
                swal("Deleted!", "Your record has been deleted Successfully!", "success");
            })
            .catch(() => {
                swal("Oops!", "Something went wrong!", "error");
            });
        }
    };

return (
    <div>
        <div className="row">
            <div className="col-lg-12" style={{textAlign:'left', margin:'50px'}}>
                <h3 className="" style={{textAlign:'center'}}>Employee List ({listData ? `${listData.length}` : '0'})</h3>
                <Link className="nav-link active" to="/add">
                    <button className="btn btn-primary">
                            Add Employee form 
                    </button> 
                </Link>
                <div className="border border-dark">
                    <table  className="table table-striped" >
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Age</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listData && listData.length > 0 ?
                        listData.map((data, i)=>{
                            return(
                            <tr key={i}>   
                                <td >{data.id}</td>
                                <td >{data.employee_name}</td>
                                <td >{data.employee_salary ? data.employee_salary : '-'}</td>
                                <td >{data.employee_age ? data.employee_age : '-'}</td>
                                <td > <button className="btn-primary" onClick={()=> deleteDetails(data.id)} > Delete </button> </td>
                            </tr>
                            );
                        }):
                        null
                        }
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);
}

export default Homepage;