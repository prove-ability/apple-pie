export default function Login() {
  return (
    <form action="/auth/login" method="post">
      <label htmlFor="email">
        Email
        <input name="email" />
      </label>
      <label htmlFor="password">
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Sign In</button>
      <button type="submit" formAction="/auth/sign-up">
        Sign Up
      </button>
    </form>
  )
}
