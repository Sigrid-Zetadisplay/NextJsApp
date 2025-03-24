// app/api/auth/signup/route.js
import { dbConnect } from "@/lib/dbConnect";
import UserAuth from "@/models/userAuthSchema";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    await dbConnect();
    const { firstName, lastName, email, password, role } = await request.json();

    // 1. Check if user already exists
    const existing = await UserAuth.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ success: false, error: "Email in use" }), {
        status: 400,
      });
    }

    // 2. Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 3. Create user
    const newUser = await UserAuth.create({
      firstName,
      lastName,
      email,
      password: hashed,
      role: role || 'user', // default = user if not provided
    });

    return new Response(JSON.stringify({ success: true, data: newUser }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
