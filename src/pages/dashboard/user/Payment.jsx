import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../shared/SectionTitle";
import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from "./CheckOutForm";

// TODO : add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_GateWay_PK);
const Payment = () => {
    return (
        <div>
            <SectionTitle heading={'Payment'} subHeading={'Please pay to eat'}></SectionTitle>

            <Elements stripe={stripePromise}>
                <CheckOutForm />
            </Elements>
        </div>
    );
};

export default Payment;