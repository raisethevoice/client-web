import { Button } from 'lib';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useLazyLoadUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} from 'store/api/auth';
import { handleAuthModal } from 'store/prompt';
import storage from 'utils/storage';
import SignUpSuccess from './SignUpSuccess';

enum AuthScreen {
  SIGNIN = 'SIGNIN',
  SIGNUP = 'SIGNUP',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
}

const initialFormValues = {
  full_name: '',
  email: '',
  password: '',
};

export default function Auth() {
  const [authScreen, setAuthScreen] = useState(AuthScreen.SIGNIN);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [loginUser, signinResp] = useLoginUserMutation();
  const [registerUser, signupResp] = useRegisterUserMutation();
  const [loadUser, loadUserResp] = useLazyLoadUserQuery();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (authScreen !== AuthScreen.SIGNUP_SUCCESS) {
      setFormValues(initialFormValues);
    }
  }, [authScreen]);

  useEffect(() => {
    const token = storage.get('access_token');

    if (token) {
      storage.clear();
      window.location.reload();
    }
  }, []);

  const handleSignin = async () => {
    try {
      const payload = {
        password: formValues.password,
        email: formValues.email,
        username: formValues.email,
      };
      const resp = await loginUser(payload).unwrap();
      storage.set('access_token', resp.token);
      loadUser('');
      handleClose();
    } catch (err) {
      return;
    }
  };

  const handleSignup = async () => {
    try {
      const payload = {
        first_name: formValues.full_name,
        email: formValues.email,
        password: formValues.password,
        username: formValues.email,
      };
      await registerUser(payload).unwrap();
      setAuthScreen(AuthScreen.SIGNUP_SUCCESS);
    } catch (err) {
      return;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    if (location.pathname === '/login') {
      navigate('/');
    } else {
      dispatch(handleAuthModal({ open: false }));
    }
  };

  const toggleAuthType = () => {
    setAuthScreen(
      authScreen === AuthScreen.SIGNIN ? AuthScreen.SIGNUP : AuthScreen.SIGNIN
    );
  };

  return (
    <div className="container flex flex-col mx-auto rounded-lg">
      {authScreen !== AuthScreen.SIGNUP_SUCCESS ? (
        <div className="flex items-center justify-center w-full lg:p-12">
          <form className="flex flex-col w-full h-full pb-6 bg-white">
            <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900 text-center">
              Sign {authScreen === AuthScreen.SIGNIN ? 'In' : 'Up'}
            </h3>

            <p className="mb-4 text-grey-700 text-center">
              {authScreen === AuthScreen.SIGNIN
                ? 'Enter your email and password'
                : 'Create a new account'}
            </p>

            <div className="flex items-center mb-3">
              <hr className="h-0 border-b border-solid border-grey-500 grow" />
              <p className="mx-4 text-grey-600">or</p>
              <hr className="h-0 border-b border-solid border-grey-500 grow" />
            </div>

            <div className="flex flex-col gap-4">
              {authScreen === AuthScreen.SIGNUP && (
                <AuthInput
                  id="name"
                  type="text"
                  name="full_name"
                  label="Full Name"
                  placeholder="Your name"
                  value={formValues?.full_name}
                  onChange={handleChange}
                  required
                />
              )}

              <AuthInput
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                value={formValues?.email}
                onChange={handleChange}
                required
              />

              <AuthInput
                label="Password"
                id="password"
                name="password"
                type={authScreen === AuthScreen.SIGNIN ? 'password' : 'text'}
                placeholder="Your password"
                value={formValues?.password}
                onChange={handleChange}
                required
              />

              <div className="mt-3">
                {authScreen === AuthScreen.SIGNIN ? (
                  <Button
                    className="rounded-2xl w-full py-5 text-sm font-bold leading-none"
                    onClick={handleSignin}
                    loading={signinResp.isLoading || loadUserResp.isLoading}
                  >
                    Sign In
                  </Button>
                ) : (
                  <Button
                    className="rounded-2xl w-full py-5 text-sm font-bold leading-none"
                    onClick={handleSignup}
                    loading={signupResp.isLoading}
                  >
                    Sign Up
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-x-1">
              <p className="text-sm leading-relaxed text-grey-900">
                {authScreen === AuthScreen.SIGNIN
                  ? 'Not registered yet?'
                  : 'Already have an account?'}
              </p>

              <p
                className="font-bold text-grey-700 cursor-pointer"
                onClick={toggleAuthType}
              >
                {authScreen === AuthScreen.SIGNIN
                  ? 'Create an Account'
                  : 'Sign in'}
              </p>
            </div>
          </form>
        </div>
      ) : (
        <SignUpSuccess email={formValues.email} />
      )}
    </div>
  );
}

const AuthInput = ({ label, required, ...props }: any) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block mb-1.5 text-sm text-start text-grey-900"
      >
        {label}
        {required && '*'}
      </label>
      <input
        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl bg-gray-100 focus:bg-gray-200"
        {...props}
      />
    </div>
  );
};

// const GoogleSignIn = () => {
// 	return (
// 		<a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300 bg-gray-100 hover:bg-gray-200">
// 			<img
// 				className="h-5 mr-2"
// 				src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
// 				alt=""
// 			/>
// 			Sign in with Google
// 		</a>
// 	);
// };
