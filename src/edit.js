import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

const Edit = () => {
  let navigate = useNavigate();
  let params = useParams();
  const formik = useFormik({
    initialValues: {
      rollNumber: 0,
      name: "",
      age: 0,
      grade: 0,
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
      await axios.put(
        `https://625bfd1cc9e78a8cb9b248ed.mockapi.io/admin/students/${params.id}`,
        values
      );
      alert("changes successed");
      navigate("/students");
    },
  });
  useEffect(() => {
    async function fetchData() {
      try {
        let user = await axios.get(
          `https://625bfd1cc9e78a8cb9b248ed.mockapi.io/admin/students/${params.id}`
        );
        formik.setValues(user.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

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
            <button
              disabled={formik.errors.values}
              type={"submit"}
              className="btn btn-primary mt-4"
            >
              {" "}
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
