import useAuth from "../../../hooks/useAuth";


const UserHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi {user.displayName}, Welcome Back</span>
            </h2>
        </div>
    );
};

export default UserHome;