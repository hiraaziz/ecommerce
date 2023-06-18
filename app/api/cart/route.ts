import { db, cartTable } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";
import { InferModel, and, eq, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const req = request.nextUrl;
  // const req = await request.json();

  const uid = req.searchParams.get("userid") as string;
  // console.log("Navbar : ", uid);
  if (!uid) {
    return NextResponse.json({ messgae: "Cart is empty" });
  }
  try {
    const res = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.userid, uid));
    return NextResponse.json({ res });
  } catch (err) {
    return NextResponse.json({ message: "Something went wrong" });
  }
}

export async function POST(request: NextRequest) {
  const req = await request.json();

  // const uid = uuid();
  // let cookieStore = cookies();

  // const uidCookie = cookieStore.get("user_id");
  // if (!uidCookie) {
  //   cookieStore.set("user_id", uid);
  // }

  try {
    const res = await db
      .insert(cartTable)
      .values({
        product_id: req.product_id,
        quantity: req.quantity,
        userid: req.user,
        // cookieStore.get("user_id")?.value as string,
      })
      .returning();
    return NextResponse.json({ res: res, status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const req = request.nextUrl;
  const id = req.searchParams.get("id") as string;
  const uid = req.searchParams.get("userid") as string;

  if (!uid) {
    return NextResponse.json({ messgae: "Cart is empty" });
  }
  try {
    const res = await db
      .delete(cartTable)
      .where(and(eq(cartTable.userid, uid), eq(cartTable.product_id, id)))
      .returning();

    return NextResponse.json({ res });
  } catch (err) {
    return NextResponse.json({ message: "Something went wrong" });
  }
}
