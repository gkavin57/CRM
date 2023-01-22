import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import axios from "axios";
import swal from "sweetalert";

const Students = () => {
  const [userData, setUsersData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let users = await axios.get(
          "https://625bfd1cc9e78a8cb9b248ed.mockapi.io/admin/students/"
        );
        setUsersData(users.data);
      } catch {
        console.log("error");
      }
    }
    fetchData();
  }, []);

  // fuction for delete data from table
  const deleteUser = (id) => {
    //prompt message for delete data
    swal({
      title: "This Data wants to delete",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `https://625bfd1cc9e78a8cb9b248ed.mockapi.io/admin/students/${id}`
          )
          .then(() => {
            getData();
          });

        swal(" Your file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Hope to safe!");
      }
    });
  };

  const getData = () => {
    axios
      .get(`https://625bfd1cc9e78a8cb9b248ed.mockapi.io/admin/students`)
      .then((getData) => {
        setUsersData(getData.data);
      });
  };

  const userContext = useContext(UserContext);

  return (
    <>
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <h1 className="h3 mb-0 text-gray-800">Employee</h1>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <Link
            to={"/userscreate"}
            type="button"
            className="d-none m-2 d-sm-inline-block btn btn-xs btn-primary shadow-sm"
          >
            {" "}
            Create Employe
          </Link>
        </div>

        {/* <!-- DataTales Example --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              DataTables Example
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>RollNumber</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Contact</th>

                    <th className="text-center">CRED</th>
                  </tr>
                </thead>

                <tbody>
                  {userData.map((data) => {
                    return (
                      <tr>
                        <td>{data.rollNumber}</td>
                        <td>{data.name}</td>
                        <td>{data.age}</td>
                        <td>{data.grade}</td>
                        <td>
                          <div className="text-center">
                            <Link
                              to={`/users-view/${data.id}`}
                              type="button"
                              className="btn btn-warning m-1"
                            >
                              View
                            </Link>
                            <Link
                              to={`/users-edit/${data.id}`}
                              type="button"
                              className="btn btn-primary m-1"
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              className="btn btn-danger m-1"
                              onClick={() => deleteUser(data.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
