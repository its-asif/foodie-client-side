import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "./SocialLogin";

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate(null);

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
            .then( () => {
                //  create user entry in the database
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    // photoURL: data.photoURL,
                    // uid: loggedUser.uid
                }
                axiosPublic.post('/users', userInfo)
                .then( result => { 
                    if(result.data.insertedId){
                        console.log("user added to the database")
                        reset();
                        Swal.fire({
                            title: "Good job!",
                            text: "Successfully Registered!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    }
                })

            })
            .catch( error => { console.log(error)})
        })
    };
    // console.log(watch("example"))

    return (
        <div className="hero min-h-screen bg-base-200">
        <Helmet>
            <title>fooDie | Register</title>
        </Helmet>
        <div className="hero-content flex-col md:flex-row-reverse">
            <div className="text-center md:w-1/2 lg:text-left">
                <h1 className="text-5xl font-bold">Register now!</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="name" {...register("name", { required: true })} name="name" className="input input-bordered" />
                {errors.name && <span className="text-red-600 text-sm">* This field is required</span>}
                </div>

                {/* Photo */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Photo URL</span>
                </label>
                <input type="text" placeholder="Photo URL" {...register("photoURL", { required: true })} name="photoURL" className="input input-bordered" />
                {errors.photoURL && <span className="text-red-600 text-sm">* This field is required</span>}
                </div>

                {/* Email */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name="email" {...register("email", { required: true })} className="input input-bordered" />
                {errors.email && <span className="text-red-600 text-sm">* This field is required</span>}
                </div>

                {/* Password */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" {...register("password", { 
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{6,20}$/  ,
                    })} placeholder="password" className="input input-bordered" />
                {errors.password?.type === 'required' && <span className="text-red-600 text-sm">* This field is required</span>}
                {errors.password?.type === 'minLength' && <span className="text-red-600 text-sm">* Password must be atleast 6 characters</span>}
                {errors.password?.type === 'maxLength' && <span className="text-red-600 text-sm">* Password must be less then 20 characters</span>}
                {errors.password?.type === 'pattern' && <span className="text-red-600 text-sm">* Must include at least one digit, one lowercase, one uppercase, and one special character</span>}

                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                </div>

                
                <div className="form-control mt-6">
                <input  className="btn btn-primary" type="submit" value="Register" />
                </div>
            </form>
            <p className="text-center"><small>Already have an account? <Link to='/login' className="text-blue-700">Login Please</Link></small></p>
                <SocialLogin /> 
            </div>
        </div>
        </div>
    );
};

export default Register;