import React, { useContext } from "react";
import { useFormik } from "formik";
import UserContext from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router";

const Createuser = () => {
  let navigate = useNavigate();

  const userContext = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      rollNumber: 0,
      name: "",
      age: 0,
      grade: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.rollNumber) {
        errors.rollNumber = "Number Please";
      } else if (!values.name) {
        errors.Name = "Enter the Name";
      }
      if (values.name.length > 15) {
        errors.Name = "Must be 15 characters or less";
      }
      if (!values.age || values.age > 18) {
        errors.age = "Age should not be greater than 18";
      }

      if (!values.grade) {
        errors.grade = "please enter mark";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        await axios.post(
          "https://625bfd1cc9e78a8cb9b248ed.mockapi.io/admin/students",
          values
        );
        userContext.setUsers([...userContext.users, values]);
      } catch (error) {
        console.log(error);
      }
      alert("form submitted");
      navigate("/students");
    },
  });
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>RollNumber</label>
            <input
              type={"text"}
              name="rollNumber"
              onChange={formik.handleChange}
              value={formik.values.rollNumber}
              className="form-control"
            />
            <span className="text-warning"> {formik.errors.rollNumber}</span>
          </div>
          <div className="col-lg-6">
            <label>Name</label>
            <input
              type={"text"}
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="form-control"
            />
            <span className="text-warning"> {formik.errors.name}</span>
          </div>
          <div className="col-lg-6">
            <label>Age</label>
            <input
              type={"number"}
              name="age"
              onChange={formik.handleChange}
              value={formik.values.age}
              className="form-control"
            />
            <span className="text-warning"> {formik.errors.age}</span>
          </div>

          <div className="col-lg-6">
            <label>Contact</label>
            <input
              type={"number"}
              name="grade"
              onChange={formik.handleChange}
              value={formik.values.grade}
              className="form-control"
            />
            <span className="text-warning"> {formik.errors.grade}</span>
          </div>
          <div className="col-lg-6">
            <input
              disabled={formik.errors.values}
              type={"submit"}
              className="btn btn-primary mt-4"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Createuser;
