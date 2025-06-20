// import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // const cookieStore = await cookies();
    const formData = await request.json();

    console.log("Received with grace", formData);
    // const payload = Object.fromEntries(formData.entries());

    try {
        // login request to the original backend
        // const res = await fetch(API_URL + "/auth/login", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         firstname: formData.firstname,
        //         lastname: formData.lastname,
        //         email: formData.email,
        //         password: formData.password
        //     })
        // });
        // const json = await res.json();
        // console.log("Response from login:", json);

        // if (res.ok) {
        //     cookieStore.set("token", json.data.token, {
        //         path: "/",
        //         expires: new Date(json.data.token_expires_at),
        //         // We can set the token as an httpOnly cookie
        //         // now because we are on the server
        //         httpOnly: true,
        //         sameSite: "lax",
        //         secure: process.env.NODE_ENV === "production"
        //     });
        // }

        // Return the same response as the external backend.
        return NextResponse.json(formData, { status: 200 });
    } catch (err) {
        console.log("Error logging in:", err);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}