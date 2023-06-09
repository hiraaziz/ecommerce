"use client";
import { loadStripe } from "@stripe/stripe-js";
import { client } from "../lib/sanityClients";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./State";

const Stripe = () => {
  const { state, dispatch } = useContext(CartContext);
  const [cartdata, setcartdata] = useState([]);
  const [stripedata, setstripedata] = useState<any>([]);

  useEffect(() => {
    const product = Get_Product_From_Store();
    Get_Product_From_Sanity(product);
  }, [state]);

  useEffect(() => {
    Generate_Data_From_Sanity_Store();
  }, [cartdata]);

  const publishableKey = process.env
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;
    Generate_Data_From_Sanity_Store();
    const checkoutSession = await fetch("/api/create-stripe-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stripedata),
    });
    const sessionID = await checkoutSession.json();
    const result = await stripe?.redirectToCheckout({
      sessionId: sessionID,
    });
    if (result?.error) {
      alert(result.error.message);
    }
  };

  function Generate_Data_From_Sanity_Store() {
    const data = cartdata.map((t: any) => ({
      title: t.title,
      type: t.type,
      price: t.price,
      quantity: state.filter((item: any) => item.product_id == t._id)[0]
        .quantity,
    }));
    setstripedata(data);
  }

  function Get_Product_From_Store() {
    const product = state.map((item: any) => item.product_id);
    return product;
  }

  async function Get_Product_From_Sanity(products: string[]) {
    const productIds = JSON.stringify(products);
    const res = await client.fetch(
      `*[_type=="product" && _id in ${productIds}]{
        _id,
        title,
        type,
        price,
        images
      }`
    );
    setcartdata(res);
  }

  return (
    <button
      onClick={createCheckOutSession}
      className="px-2 py-2 bg-black text-white"
    >
      Process to Checkout
    </button>
  );
};

export default Stripe;
