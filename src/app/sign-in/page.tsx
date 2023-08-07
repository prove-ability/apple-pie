export default function SignIn() {
  return (
    <form action="/auth/sign-in" method="post">
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
