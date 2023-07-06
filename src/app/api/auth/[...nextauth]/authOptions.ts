import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const clientId = String(process.env.GOOGLE_CLIENT_ID);
const clientSecret = String(process.env.GOOGLE_CLIENT_SECRET);
const secret = String(process.env.SECRET);

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret,
};

export default authOptions;
