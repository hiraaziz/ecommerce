"use client";
import { CartItem } from "@/type";
import { createContext, useReducer, useState } from "react";

const initialState: CartItem[] = [];

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "FetchedCart":
      return action.payload;

    case "AddToCart":
      return [...state, action.payload];

    case "ChangeQuantity":
      return state.map((t: any) => {
        if (t.product_id == action.payload.product_id) {
          return {
            product_id: t.product_id,
            quantity: action.payload.quantity,
          };
        } else {
          return t;
        }
      });

    case "DELETECART":
      return state.filter(
        (t: CartItem) => t.product_id !== action.payload.product_id
      );

    case "DONEPAYMENT":
      return [];

    default:
      return state;
  }
};

export const CartContext = createContext<any | null>(null);

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default StateProvider;
