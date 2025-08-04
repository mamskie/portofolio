// import NextAuth from 'next-auth/next';
// import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
// import type { AuthOptions } from 'next-auth';
// import type { CustomSession } from '@lib/types/api';

// // Perluas tipe token agar tidak perlu pakai "any"
// interface ExtendedToken {
//   sub?: string;
//   email?: string;
//   provider?: string;
//   username?: string;
// }

// // Deklarasi ulang tipe bawaan NextAuth untuk session dan user
// declare module 'next-auth' {
//   interface Session {
//     user: {
//       name: string;
//       email: string;
//       image: string;
//       provider?: string;
//       id?: string;
//       admin?: boolean;
//       username?: string;
//     };
//   }

//   interface User {
//     id: string;
//     admin?: boolean;
//   }
// }

// export const authOptions: AuthOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//       profile(profile) {
//         return {
//           id: profile.id.toString(),
//           name: profile.name || profile.login,
//           email: profile.email,
//           image: profile.avatar_url,
//           username: profile.login // ambil username GitHub
//         };
//       }
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!
//     })
//   ],
//   callbacks: {
//     jwt({ token, account, profile }) {
//       if (account) {
//         token.provider = account.provider;
//         if (account.provider === 'github' && profile) {
//           token.username = (profile as any).login;
//         }
//       }
//       return token;
//     },

//     session({ session, token }): CustomSession {
//       const id = token.sub as string;
//       const email = token.email ?? session.user?.email ?? '';
//       const provider = (token as ExtendedToken).provider ?? 'unknown';

//       // Ambil username dari token jika ada, fallback ke awal email
//       const username = (token as ExtendedToken).username ?? email.split('@')[0];

//       const isAdmin = email === 'khotib.bul@gmail.com';

//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id,
//           email,
//           username,
//           provider,
//           admin: isAdmin
//         }
//       };
//     }
//   },
//   secret: process.env.NEXTAUTH_SECRET
// };

// export default NextAuth(authOptions);
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import type { AuthOptions } from 'next-auth';
import type { CustomSession } from '@lib/types/api';

// Buat tipe khusus untuk profile GitHub
interface GitHubProfile {
  id: number;
  name: string | null;
  email: string | null;
  avatar_url: string;
  login: string;
}

// Perluas tipe token agar tidak perlu pakai "any"
interface ExtendedToken {
  sub?: string;
  email?: string;
  provider?: string;
  username?: string;
}

// Deklarasi ulang tipe bawaan NextAuth
declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      provider?: string;
      id?: string;
      admin?: boolean;
      username?: string;
    };
  }

  interface User {
    id: string;
    admin?: boolean;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile: GitHubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email ?? `${profile.login}@users.noreply.github.com`,
          image: profile.avatar_url,
          username: profile.login
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    jwt({ token, account, profile }) {
      if (account?.provider === 'github' && profile) {
        const githubProfile = profile as GitHubProfile;
        token.username = githubProfile.login;
      }

      if (account) {
        token.provider = account.provider;
      }

      return token;
    },

    session({ session, token }): CustomSession {
      const id = token.sub ?? '';
      const email = token.email ?? session.user?.email ?? '';
      const provider = (token as ExtendedToken).provider ?? 'unknown';
      const username = (token as ExtendedToken).username ?? email.split('@')[0];

      const isAdmin = email === 'khotib.bul@gmail.com';

      return {
        ...session,
        user: {
          ...session.user,
          id,
          email,
          username,
          provider,
          admin: isAdmin
        }
      };
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true
};

export default NextAuth(authOptions);
