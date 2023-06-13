import { db, cartTable } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { InferModel, eq, sql, and } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const req = await request.json();

  try {
    const res = await db
      .update(cartTable)
      .set({ product_id: req.product_id, quantity: req.quantity })
      .where(
        and(
          eq(cartTable.userid, req.userid),
          eq(cartTable.product_id, req.product_id)
        )
      )
      .returning({
        Uproduct_id: cartTable.product_id,
        Uquantity: cartTable.quantity,
      });
    console.log(res);

    return NextResponse.json({ res: res, status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
