import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Represents a session with an authenticated user.
   * This type extends the base `DefaultSession` type and adds user-specific properties.
   * @property {object} user - An object representing the authenticated user.
   * @property {string} user.name - The name of the user.
   * @property {string} user.email - The email address of the user.
   * @property {string} user.image - The image URL of the user.
   *
   * @extends DefaultSession
   *
   * @example
   * // Example of an authenticated session
   * const authenticatedSession: AuthenticatedSession = {
   *   user: {
   *     name: 'John Doe',
   *     email: 'john@example.com',
   *     image: 'https://example.com/john.jpg',
   *     // other user properties
   *   },
   *   // other session properties
   * };
   */
  interface AuthenticatedSession extends DefaultSession {
    user: User & {
      name: string;
      email: string;
      image: string;
    };
  }
}
