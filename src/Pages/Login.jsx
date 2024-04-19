import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'

import { useDispatch, useSelector } from 'react-redux';
import { addAuth, getAuth, logoutAuth } from '../Redux/action/auth.action';
import { useHistory, useNavigate } from 'react-router-dom';
import { adminLoginGet } from '../Redux/action/admin.action';
import PrivateRoutes from '../Routes/PrivateRoutes';


const Login = ({ isAdmin }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        // dispatch(getAuth());
        dispatch(adminLoginGet()) // Dispatching the action
    }, [dispatch]);

    // const authVal = useSelector(state => state.auth);
    // console.log('login', authVal.user);

    const userVal = useSelector(state => state.users);
    console.log(userVal.users);


    let loginschema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required(),

    });

    const formik = useFormik({
        validationSchema: loginschema,
        initialValues: {
            email: '',
            password: '',

        },
        onSubmit: (values, action) => {

            console.log(values);

            const notification = document.createElement('div');
            notification.textContent = 'successfully... \nEmail: ' + values.email;
            notification.style.backgroundColor = '#4CAF50';  // Background color
            notification.style.color = '#FFFFFF';  // Text color
            notification.style.padding = '15px';
            notification.style.position = 'fixed';
            notification.style.top = '10px';
            notification.style.right = '10px';
            notification.style.zIndex = '9999';
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

            document.body.appendChild(notification);
            // handleLogin(values)
            const isAdmin = userVal.users.some(user => {
                console.log("Checking user email:", user.email);
                return user.email === values.email &&
                    user.password === values.password
            });
            <PrivateRoutes isAdmin={isAdmin} />
            console.log("isAdmin:", isAdmin);

            setTimeout(() => {
                notification.remove();
            }, 3000);

            if (isAdmin) {
                console.log("Redirecting to admin panel");
                navigate('/admin');

            } else {
                console.log("Regular login");
                // handleLogin(values);
                navigate('/')
            }

            setTimeout(() => {
                notification.remove();
            }, 3000);

            action.resetForm();
        },

    });

    const handleLogin = (values) => {
        console.log('loginvalue', values);
        dispatch(addAuth(values));
        localStorage.setItem('user', JSON.stringify(values));

    }

    const handleLogout = () => {

        // dispatch(logoutAuth());
        const notification = document.createElement('div');
        notification.textContent = 'Logged out successfully!';
        notification.style.backgroundColor = '#F44336';  // Background color
        notification.style.color = '#FFFFFF';  // Text color
        notification.style.padding = '15px';
        notification.style.position = 'fixed';
        notification.style.top = '10px';
        notification.style.right = '10px';
        notification.style.zIndex = '9999';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);  // Remove no
        localStorage.removeItem('user');
        navigate('/logins');
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;


    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Login</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Contact</li>
                </ol>
            </div>
            <div className='login-from'>
                <h1>Login </h1>
                <form action="" onSubmit={handleSubmit}>
                    <label>E-mail</label>
                    <input type="email" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder='Enter your email......' />
                    <span style={{ color: 'red' }}>{errors.email && touched.email ? errors.email : null}  </span>
                    <label>password</label>
                    <input type="password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder='Enter your password......' />
                    <span style={{ color: 'red' }}>{errors.password && touched.password ? errors.password : null}  </span>
                    <div className='login-button'>
                        <button type='submit'>Login</button>
                    </div>
                </form>
                <div className='login-button'>
                    <button onClick={handleLogout} >Logout</button>
                </div>

            </div>
        </>
    )
}

export default Login
