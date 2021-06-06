import type { LoginProps } from "../types";

function Login(props: LoginProps) {
  return (
    <nav className="login">
      <h2>Login</h2>
      <p>Sign in to manage your store's inventory.</p>
      <button type="button" className="github" onClick={() => props.authenticate("Github")}>
        Log in with Github
      </button>
      <button type="button" className="twitter" onClick={() => props.authenticate("Twitter")}>
        Log in with Twitter
      </button>
      <button type="button" className="google" onClick={() => props.authenticate("Google")}>
        Log in with Google
      </button>
    </nav>
  );
}

export default Login;
