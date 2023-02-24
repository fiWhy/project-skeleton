import type { ReactElement } from 'react';
import { useLogic } from './hooks/index.js';
import { FaGoogle } from 'react-icons/fa';

/**
 * `<Login>` component.
 */
export const Login = (): ReactElement => {
  const { login } = useLogic();

  return (
    <div className="hero-content min-h-screen flex-col">
      <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
        <div className="card-body">
          <h1 className="card-title font-bold">Welcome to your area!</h1>
          <div className="form-control mt-6">
            <button onClick={(): void => login()} className="btn-primary btn">
              <FaGoogle className="mr-4" />
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
