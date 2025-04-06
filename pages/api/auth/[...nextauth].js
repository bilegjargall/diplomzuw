// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Имэйл", type: "text" },
        password: { label: "Нууц үг", type: "password" },
      },
      async authorize(credentials) {
        const users = [
          { id: 1, email: "admin@mail.mn", password: "123456", role: "admin" },
          { id: 2, email: "manager@mail.mn", password: "123456", role: "udirdlaga" },
          { id: 3, email: "employee@mail.mn", password: "123456", role: "ajiltan" },
        ];
        const user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        );
        return user || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: "secret123", // өөрийн нууц үгийг .env.local дотор тохируулна
};

export default NextAuth(authOptions);


