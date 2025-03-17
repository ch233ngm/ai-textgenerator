import NextAuth from "next-auth"
import { jwtDecode } from "jwt-decode"
import GoogleProvider from "next-auth/providers/google"
// 单独封装用户注册函数
async function registerUser(userData) {
  try {
    const response = await fetch('https://hello-ai.ch233ngm.workers.dev/api/user-registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        name: userData.name,
        image: userData.image,
        provider: userData.provider
      }),
    });
    
    if (!response.ok) {
      console.error('用户注册 API 调用失败:', await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('调用注册 API 时出错:', error);
    return false;
  }
}

const authOptions = {
  providers: [
    {
      id: "google-one-tap",
      name: "Google One Tap",
      type: "credentials",
      credentials: {
        credential: { type: "text" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.credential) return null;
          const decoded = jwtDecode(credentials.credential);
          if (!decoded.sub || !decoded.email) return null;
          
          // 创建用户对象
          const user = {
            id: decoded.sub,
            name: decoded.name,
            email: decoded.email,
            image: decoded.picture,
            provider: "google-one-tap"
          };
          
          // 调用注册函数
          await registerUser(user);
          // 即使注册失败，我们仍然允许用户登录
          
          return user;
        } catch (error) {
          console.error("Google One Tap 验证错误:", error);
          return null;
        }
      } // 当用户尝试登录时调用
    },
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile',
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      async profile(profile) {
        try {
        const user = {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          provider: "google"
        }
        await registerUser(user);
        return user;
        } catch (error) {
          console.error("注册用户时出错:", error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
      // 这里都加上provider表示都是google-one-tap方式登陆，如果多种登陆方式时有用
    async signIn({ user, account }) { // 用户每次登录时都会调用（无论是首次登录还是重复登录）
      console.log('signIn', user, account);
      if (account?.provider) {
        user.provider = account.provider
      }
      return true
    },
    async jwt({ token, account, user }) {
      if (user) {
        token.provider = user.provider
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.provider = token.provider
      }
      return session
    },
  }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }