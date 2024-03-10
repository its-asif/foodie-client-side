import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate(null);
    

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then( result =>{
            // console.log(result.user);
            const userInfo ={
                name : result.user.displayName,
                email : result.user.email,
            }
            axiosPublic.post('/users', userInfo)
            .then( result => {
                // console.log(result.data);
                navigate('/');
            })
        })
    }
    return (
        <div className="p-8 text-center">
            <div className="divider"></div>
            <div>
                <button className="btn text-red-600"
                    onClick={handleGoogleSignIn}
                >
                    <FaGoogle className='mr-2 text-red-600'></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;