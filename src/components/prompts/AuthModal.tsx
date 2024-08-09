import { Button, Modal } from "lib";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
	useLazyLoadUserQuery,
	useLoginUserMutation,
	useRegisterUserMutation,
} from "store/api/auth";
import { handleAuthModal } from "store/prompt";
import storage from "utils/storage";

enum AuthType {
	SIGNIN = "SIGNIN",
	SIGNUP = "SIGNUP",
}

const initialFormValues = {
	full_name: "",
	email: "",
	password: "",
};

export default function AuthModal() {
	const [authType, setAuthType] = useState(AuthType.SIGNIN);
	const [formValues, setFormValues] = useState(initialFormValues);
	const { authModal } = useSelector((state: RootState) => state.prompt);
	const dispatch = useDispatch();
	const [loginUser, signinResp] = useLoginUserMutation();
	const [registerUser, signupResp] = useRegisterUserMutation();
	const [loadUser, loadUserResp] = useLazyLoadUserQuery();

	useEffect(() => {
		setFormValues(initialFormValues);
	}, [authType]);

	const handleSignin = async () => {
		try {
			const resp = await loginUser({
				password: formValues.password,
				email: formValues.email,
				username: formValues.email,
			}).unwrap();
			storage.set("access_token", resp.token);
			loadUser("");
			handleClose();
		} catch (err) {
			return;
		}
	};

	const handleSignup = async () => {
		try {
			await registerUser({
				full_name: formValues.full_name,
				email: formValues.email,
				password: formValues.password,
				username: formValues.email,
			}).unwrap();
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
		dispatch(handleAuthModal({ open: false }));
		setAuthType(AuthType.SIGNIN);
	};

	const toggleAuthType = () => {
		setAuthType(
			authType === AuthType.SIGNIN ? AuthType.SIGNUP : AuthType.SIGNIN
		);
	};

	return (
		<Modal footer={false} centered onCancel={handleClose} {...authModal}>
			<div className="container flex flex-col mx-auto rounded-lg">
				<div className="flex items-center justify-center w-full lg:p-12">
					<form className="flex flex-col w-full h-full pb-6 bg-white">
						<h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900 text-center">
							Sign {authType === AuthType.SIGNIN ? "In" : "Up"}
						</h3>

						<p className="mb-4 text-grey-700 text-center">
							{authType === AuthType.SIGNIN
								? "Enter your email and password"
								: "Create a new account"}
						</p>

						<div className="flex items-center mb-3">
							<hr className="h-0 border-b border-solid border-grey-500 grow" />
							<p className="mx-4 text-grey-600">or</p>
							<hr className="h-0 border-b border-solid border-grey-500 grow" />
						</div>

						<div className="flex flex-col gap-4">
							{authType === AuthType.SIGNUP && (
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
								type={authType === AuthType.SIGNIN ? "password" : "text"}
								placeholder="Your password"
								value={formValues?.password}
								onChange={handleChange}
								required
							/>

							<div className="mt-3">
								{authType === AuthType.SIGNIN ? (
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
								{authType === AuthType.SIGNIN
									? "Not registered yet?"
									: "Already have an account?"}
							</p>

							<p
								className="font-bold text-grey-700 cursor-pointer"
								onClick={toggleAuthType}
							>
								{authType === AuthType.SIGNIN ? "Create an Account" : "Sign in"}
							</p>
						</div>
					</form>
				</div>
			</div>
		</Modal>
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
				{required && "*"}
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
