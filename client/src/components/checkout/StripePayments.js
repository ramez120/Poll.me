import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./StripePayment.css";
import { Container } from "@material-ui/core";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const StripePayment = () => {
  return (
    <React.Fragment>
      <Container className="h-100">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Container>
    </React.Fragment>
  );
};
export default StripePayment;
