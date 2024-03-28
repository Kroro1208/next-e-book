import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import GoogleProvider from "next-auth/providers/google";
import prisma from "../prisma";

// GitHubで認証されると同時にprismaにユーザーデータが保存される
export const authOptions: NextAuthOptions = {
  debug: false,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // GoogleProvider({
    //   //Google認証プロバイダーの設定を追加
    //   clientId: process.env.GOOGLE_ID!,
    //   clientSecret: process.env.GOOGLE_SECRET!,
    //   authorization: { params: { prompt: "consent", access_type: "offline" } }, // オプションでスコープやプロンプトタイプを指定可能
    // }),
  ],
  adapter: PrismaAdapter(prisma),
  // フロントにセッション情報を渡す
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
};
