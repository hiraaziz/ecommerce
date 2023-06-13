"use client";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/components/State";
import { loadStripe } from "@stripe/stripe-js";

type ICart = {
  id: number;
  userid: string;
  quantity: number;
  productid: string;
};

const OrderSumary = ({ cartdata }: any) => {
  const [cartcount, setcartcount] = useState(0);
  const [totalprice, settotalprice] = useState(0);
  const { state } = useContext(CartContext);

  const publishableKey = process.env
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
  const stripePromise = loadStripe(publishableKey);

  function countQuantity() {
    if (state.length != 0) {
      const count = state.reduce(
        (acc: number, curr: ICart) => acc + curr.quantity,
        0
      );
      setcartcount(count);
    }
  }

  function countTotalPrice() {
    let count = 0;
    state.map((t: any) => {
      const prod_data = cartdata.filter(
        (cart: any) => cart._id == t.product_id
      )[0];
      count = count + prod_data.price * t.quantity;
    });
    settotalprice(count);
    console.log("Price total : ", totalprice);
  }

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await fetch("/api/create-stripe-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: {
          name: "item 1",
          description: "clothes website",
          price: 20,
          quantity: 3,
        },
      }),
    });

    const sessionID = await checkoutSession.json();
    const result = await stripe?.redirectToCheckout({
      sessionId: sessionID,
    });
    if (result?.error) {
      alert(result.error.message);
    }
  };

  useEffect(() => {
    countQuantity();
    countTotalPrice();
  }, [state]);

  return (
    <div className=" flex flex-col gap-6 w-[200px] h-[250px] m-auto  bg-[#FBFCFF] p-2 mt-10 md:mt-0">
      <h1 className="font-bold text-lg ">Order Summary</h1>
      <h2>Quantity {cartcount}</h2>
      <h2>Sub Total ${totalprice}</h2>
      <button
        onClick={createCheckOutSession}
        className="px-2 py-2 bg-black text-white"
      >
        Process to Checkout
      </button>
    </div>
  );
};

export default OrderSumary;
