import React, { useContext } from 'react'
import { useFormik } from 'formik';
import UserContext from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Createteachers = () => {
    let navigate = useNavigate();

    const userContext = useContext(UserContext)

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            age: 0,
            department: ""

        },
        validate: values => {
            const errors = {};

            if (!values.id) {
                errors.id = 'Valid Id Please';
            }
            else if (!values.name) {
                errors.Name = 'Enter the Name';
            }
            if (values.name.length > 15) {
                errors.Name = 'Must be 15 characters or less';
            }
            if (!values.age || values.age < 25) {
                errors.age = 'Age should not be lesser than 25';
            }
            if (!values.department) {
                errors.department = 'please enter Department';
            }

            return errors;
        },
        onSubmit: async values => {
            try {
                await axios.post("https://625bfd1cc9e78a8cb9b248ed.mockapi.io/admin/teachers", values)
                userContext.setUsers([...userContext.users, values])
            } catch (error) {
                console.log(error);
            }
            alert("form submitted")
            navigate('/teachers')


        },
    })
    return (

        <div className='container'>
            <form onSubmit={formik.handleSubmit}>
                <div className='row'>
                    <div className='col-lg-6'>
                        <label>ID</label>
                        <input type={"text"} name="id" onChange={formik.handleChange}
                            value={formik.values.id} className="form-control" />
                        <span className='text-warning'> {formik.errors.id}</span>
                    </div>
                    <div className='col-lg-6'>
                        <label>Name</label>
                        <input type={"text"} name="name" onChange={formik.handleChange}
                            value={formik.values.name} className="form-control" />
                        <span className='text-warning'> {formik.errors.name}</span>
                    </div>
                    <div className='col-lg-6'>
                        <label>Age</label>
                        <input type={"number"} name="age" onChange={formik.handleChange}
                            value={formik.values.age} className="form-control" />
                        <span className='text-warning'> {formik.errors.age}</span>
                    </div>

                    <div className='col-lg-6'>
                        <label>Department</label>
                        <input type={"text"} name="department" onChange={formik.handleChange}
                            value={formik.values.department} className="form-control" />
                        <span className='text-warning'> {formik.errors.department}</span>
                    </div>
                    <div className='col-lg-6'>
                        <input disabled={formik.errors.values} type={"submit"} className="btn btn-primary mt-4" />
                    </div>
                </div>
            </form>
        </div>
    )
}


export default Createteachers