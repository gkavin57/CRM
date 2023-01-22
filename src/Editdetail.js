import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router';



const Editdetail = () => {

    let navigate = useNavigate();
    let params = useParams()
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
        onSubmit: async (values) => {
            await axios.put(`https://625bfd1cc9e78a8cb9b248ed.mockapi.io/admin/teachers/${params.id}`, values)
            alert("changes successed")
            navigate('/teachers')
        }

    })
    useEffect(() => {
        async function fetchData() {
            try {
                let user = await axios.get(`https://625bfd1cc9e78a8cb9b248ed.mockapi.io/admin/teachers/${params.id}`)
                formik.setValues(user.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }, [])


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
                        <button disabled={formik.errors.values} type={"submit"} className="btn btn-primary mt-4"> Save changes</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Editdetail