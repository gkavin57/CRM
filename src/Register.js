import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Requried";
      } else if (values.name.length > 15) {
        errors.name = "must be 15 characters or less";
      }
      if (!values.email) {
        errors.email = "Requried";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "must be 8 characters";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await axios.post(
          "https://todo0-backend-3g9wjyss1-gkavin57.vercel.app/signup",
          values
        );
        {
          navigate("/");
        }
        alert("Successfully Registerd & wait for Admin Confirmation");
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    },
  });
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto flex-column row">
          <div className="col-6">
            <label>
              Name<span style={{ color: "red" }}>*{formik.errors.name}</span>
            </label>
            <input
              type={"text"}
              name="name"
              id="name"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>
          <div className="col-6">
            <label>
              Email<span style={{ color: "red" }}>*{formik.errors.email}</span>
            </label>
            <input
              type={"email"}
              name="email"
              id="username"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="col-6">
            <label>
              Create Password
              <span style={{ color: "red" }}>*{formik.errors.password}</span>
            </label>
            <input
              type={"password"}
              name="password"
              id="password"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className="col-lg-12 mt-3">
            <input
              disabled={Object.keys(formik.errors).length !== 0}
              type={"submit"}
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
