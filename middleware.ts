import { withAuth } from "next-auth/middleware";

// export { default } from "next-auth/middleware";
export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
});

export const config = {
  // matcher: ["/profile"],
  matcher: ["/cart", "/male", "/female", "/allproducts"],
};
