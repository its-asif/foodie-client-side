import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";


const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data : payments = []} = useQuery({
        queryKey : ['payments', user?.email],
        queryFn : async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            return res.data;
        },
    })


    return (
        <div>
            <SectionTitle heading={'Payment History'} subHeading={'All your payments are listed here'} />

            <h2 className="text-2xl">Total Payments : {payments.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Trx. ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map( (payment, index) => (
                                <tr key={payment._id}>
                                    <td>{index + 1}</td>
                                    <td>${payment.price}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;