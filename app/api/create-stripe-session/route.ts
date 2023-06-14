import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function POST(req: any, res: NextResponse) {
  const request = await req.json();

  const transformeddata = request.map((t: any) => {
    if (t.quantity < 1 || isNaN(t.quantity)) {
      throw new Error(`Invalid quantity for item ${t.title}`);
    }
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: t.title,
          description: t.type,
          metadata: {
            name: "some additional info",
            task: "Usm created a task",
          },
        },
        unit_amount: t.price * 100,
      },
      quantity: t.quantity,
    };
  });

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "your deployed url";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: transformeddata,
    mode: "payment",
    success_url: redirectURL + "/payment/success",
    cancel_url: redirectURL + "/payment/fail",
    metadata: {
      name: "some additional info",
      task: "ecommerce",
    },
  });

  return NextResponse.json(session?.id);
}
