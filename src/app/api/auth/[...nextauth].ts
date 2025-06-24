// // pages/api/auth/[...nextauth].ts
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     Credentials({
//       name: "Custom Login",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // Optional: Add a dummy check to support credentials login.
//         if(!credentials) return null; 
//         if (!credentials.email || !credentials.password) {
//           throw new Error("Email and password are required");
//           return null;
//         }
//         const user = {
//           // id: credentials.id,
//           // name: credentials.name,
//           email: credentials.email,
//           // token: credentials.token,
//         };

//         return user;
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.accessToken = user.token;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };
