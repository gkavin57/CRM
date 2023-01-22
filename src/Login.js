import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = "Email Missing";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
      ) {
        errors.username = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password  missing";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        let loginData = await axios.post(
          "https://todo0-backend-3g9wjyss1-gkavin57.vercel.app/login",
          values
        );
        window.localStorage.setItem("myapptoken", loginData.data.token);
        {
          loginData.data.message === "login sucessfull"
            ? navigate("/teachers")
            : alert("Does not match");
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    },
  });
  return (
    <div className="container ">
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto flex-column row">
          <div className="col-6">
            <label>
              Email{" "}
              <span style={{ color: "red" }}>{formik.errors.username}</span>
            </label>
            <input
              type={"email"}
              className="form-control"
              name="username"
              id="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </div>
          <div className="col-6">
            <label>
              Password{" "}
              <span style={{ color: "red" }}>{formik.errors.password}</span>
            </label>
            <input
              type={"password"}
              className="form-control"
              name="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className="d-flex col mt-4">
            <div className="mr-5">
              <input
                disabled={Object.keys(formik.errors).length !== 0}
                type={"submit"}
                className="btn btn-primary m-1"
                value={"Login"}
              />

              <Link to={"/register"} className="btn btn-primary">
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
