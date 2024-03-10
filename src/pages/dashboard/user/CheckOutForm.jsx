import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { set } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";



const CheckOutForm = () => {
    const [error, setError] = useState('');
    const {user} = useAuth();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if(totalPrice){
            axiosSecure.post('/create-payment-intent', { price : totalPrice})
            .then(res => {
                console.log(res.data);
                setClientSecret(res.data.clientSecret);
            })
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if( !stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);
        if(!card){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });

        if(error) {
            console.log(error);
        }
        else{
            console.log(paymentMethod);
        }

        // confirm payment
        const {paymentIntent , error : confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email : user?.email || 'anonymous',
                    name : user?.displayName || 'anonymous',
                },
            }
        });


        if(confirmError){
            Swal.fire({ 
                title: "Payment Failed!",
                text: confirmError.message,
                icon: "error",
                showConfirmButton: false,
                timer: 2000
            });
        }
        else{
            if(paymentIntent.status === 'succeeded'){
                setTransactionId(paymentIntent.id);
                console.log(paymentIntent);
                
                const payment ={
                    transactionId : paymentIntent.id,
                    email: user?.email,
                    price : totalPrice,
                    date : new Date(), // todo: utc date convert.. use moment.js
                    cartIds : cart.map(item => item._id),
                    menuItemIds : cart.map(item => item.menuId),
                    status : 'pending',
                };

                const res = await axiosSecure.post('/payments', payment)

                console.log("payment saved", res.data);
                refetch();

                Swal.fire({ 
                    title: "Payment Success!",
                    text: paymentIntent.id,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });

                navigate('/dashboard/paymentHistory');
            }
        }

    }
    return (
        <div>
            <form onSubmit = {handleSubmit}>
            <CardElement
                options={{
                style: {
                    base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                    },
                    invalid: {
                    color: '#9e2146',
                    },
                },
                }}
            />
            <button
            type="submit" disabled={!stripe || !clientSecret}
            className="btn btn-sm btn-primary mt-5">
                Pay
            </button>
            </form>
        </div>
    );
};

export default CheckOutForm;