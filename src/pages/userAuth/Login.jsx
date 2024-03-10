import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from './SocialLogin';


const Login = () => {
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const { signIn} = useContext(AuthContext);
    
    useEffect(() => { 
        loadCaptchaEnginge(6);
    } , []);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password)
        signIn(email, password)
        .then( result => {
            const user = result.user;
            // console.log(user);
            Swal.fire({
                title: "Good job!",
                text: "Successfully Logged in!",
                icon: "success"
              });
            navigate(from, {replace:true});
        })
    }

    const handleValidateCaptcha = (e) => {
        e.preventDefault();
        const captchaValue = captchaRef.current.value;
        
        if(validateCaptcha(captchaValue)) {
            setDisabled(false);
        } else {
            console.log('Captcha not validated')
        }

    }

    return (
        <div className="hero min-h-screen bg-base-200">
        <Helmet>
            <title>fooDie | Login</title>
        </Helmet>
        <div className="hero-content flex-col md:flex-row-reverse">
            <div className="text-center md:w-1/2 lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>

                {/* Email */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                </div>

                {/* Password */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                </div>

                {/* Captcha */}
                <div className="form-control">
                <label className="label">
                    <LoadCanvasTemplate />
                </label>
                <div className='flex'>
                    <input type="text" ref={captchaRef} name="captcha" placeholder="type the captcha above" className="input input-bordered" required />
                    <button className="btn btn-outline my-auto mx-auto" onClick={handleValidateCaptcha}>Validate</button>
                </div>
                </div>
                <div className="form-control mt-6">
                <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
                </div>
            </form>
            <p className='text-center'><small>New Here? <Link to='/register' className='text-blue-700'>Create an account</Link></small></p>
            <SocialLogin />
            </div> 
        </div>
        </div>
    );
};

export default Login;