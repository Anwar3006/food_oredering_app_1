import { authClient } from "./src/lib/auth-client.js";

const { data, error } = await authClient.signIn.email(
  {
    /**
     * The user email
     */
    email: "testing@email.com",
    /**
     * The user password
     */
    password: "password123",
    /**
     * A URL to redirect to after the user verifies their email (optional)
     */

    /**
     * remember the user session after the browser is closed.
     * @default true
     */
    rememberMe: false,
  },
  {
    //callbacks
  }
);
