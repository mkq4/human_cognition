import { Button } from '../ui/button';

export const RegisterForm = () => {
  return (
    <div className="flex flex-col gap-5 w-[500px] bg-white p-5 rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-center">Registration</h1>
      <form className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          className="border-1 p-3 rounded-l"
        />
        <input
          type="email"
          placeholder="Email"
          className="border-1 p-3 rounded-l"
        />
        <input
          type="password"
          placeholder="Password"
          className="border-1 p-3 rounded-l"
        />
        <Button type="submit">Create account</Button>
      </form>
    </div>
  );
}
