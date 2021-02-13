import React, { useState, useEffect } from "react";
import {getUserLoginStatus}from '../../actions';
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import "./CheckoutForm.css";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { connect } from "react-redux";
const CheckoutForm = ({getUserLoginStatus,auth}) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    const payment = async () => {
      
      // Create PaymentIntent as soon as the page loads
      const res = await axios.post("/api/stripe", {
        
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      });
      setClientSecret(res.data.clientSecret);
    };
    payment();
    
  }, []);
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  // handle submitting payment
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(
          CardNumberElement,
          CardExpiryElement,
          CardCvcElement
        ),
      },
    });
    // handle error
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      getUserLoginStatus();

      setError(null);
      setProcessing(false);
      setSucceeded(true);  
      alert("Your credit is updated !! ")
      
  
    }
  };
  return (
    <div className="d-flex-center">
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className="label-holder">
          <p>$20</p>
        </div>
        <div className="d-flex-center">
          <h1 className="checkout-title">Checkout</h1>
        </div>
        <label>Credit Card Number :</label>
        <CardNumberElement className="input-full"></CardNumberElement>
        <div className="d-flex-between">
          <CardExpiryElement
            options={cardStyle}
            className="input-half"
            onChange={handleChange}
          ></CardExpiryElement>
          <CardCvcElement
            options={cardStyle}
            className="input-half"
            onChange={handleChange}
          ></CardCvcElement>
        </div>
        <button
          className="form-btn-pay"
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="d-flex-center ">
            <Alert severity="error" className="w-100 d-flex-center mt-2">
              {error}
            </Alert>
          </div>
        )}
        {/* Show a success message upon completion */}
        <div className={succeeded ? "result-message" : "result-message hidden"}>
          <span className="d-flex-center ">
            <Alert severity="success" className="w-100 d-flex-center mt-2">
              Payment Succeeded ! 
            </Alert>
          </span>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = ({auth}) =>{
  return {auth};
}
export default connect(mapStateToProps,{
  getUserLoginStatus
})(CheckoutForm);
