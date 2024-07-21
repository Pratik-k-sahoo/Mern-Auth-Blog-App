import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login, loginFailure } from "../context/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "./OAuth/OAuth";

const Signin = () => {
	const [formData, setFormData] = useState({});
	const { error } = useSelector((state) => state.persistedReducer.user);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post("/api/auth/signin", formData);
			setLoading(false);
			dispatch(login(response.data));
			navigate("/");
		} catch (error) {
			setLoading(false);
			if (error.response != undefined) {
				if (
					error.response.data.error != undefined &&
					error.response.data.error.substring(0, 6) === "E11000"
				) {
					dispatch(loginFailure("Duplicate Entry"));
				} else if (error.response.data.error != undefined) {
					dispatch(loginFailure(error.response.data.error));
				}
			} else dispatch(loginFailure(error.message));
		}
	};

	return (
		<>
			<section className="w-full py-5 mt-5">
				<div className="w-[500px] mx-auto p-5 border-2 rounded-xl bg-white px-16">
					<div className="w-full">
						<h1 className="text-center font-bold text-[30px]">
							Welcome To Pinterest
						</h1>
						<form onSubmit={handleSignIn}>
							<div className="w-full my-4">
								<label htmlFor="username" className="px-2">
									Username
								</label>
								<input
									autoComplete="username"
									type="text"
									id="username"
									name="username"
									placeholder="Enter your username"
									className="border-gray-600 rounded-3xl border-2 p-2 bg-blue-200  w-full"
									onChange={(e) => handleInputChange(e)}
									required
								/>
							</div>
							<div className="w-full my-4">
								<label htmlFor="password" className="px-2">
									Password
								</label>
								<input
									autoComplete="current-password"
									type="password"
									id="password"
									name="password"
									placeholder="Enter your password"
									className="border-gray-600 rounded-3xl border-2 p-2 bg-blue-200  w-full"
									onChange={(e) => handleInputChange(e)}
									required
								/>
							</div>
							<div className="my-5 px-2 font-semibold text-lg">
								<Link to={"/"}>Forgot your password?</Link>
							</div>
							<div className="my-5">
								<button
									disabled={loading}
									className="bg-red-500 w-full rounded-3xl py-2 text-white text-xl font-bold"
								>
									{loading ? "Loading" : "Submit"}
								</button>
							</div>
							{error && error !== "false" && (
								<p className="text-red-500 text-center">
									{error || "Something went wrong"}
								</p>
							)}
							<span className="text-center block text-xl">
								OR
							</span>
							<div className="my-5">
								<button className="bg-blue-500 w-full rounded-3xl py-2 text-white text-xl font-bold">
									Continue with Facebook
								</button>
							</div>
							<div className="my-5">
								<OAuth setLoading={setLoading} />
							</div>
							<div className="mb-3 text-center">
								By continuing, you agree to Pinterest's Terms of
								Service and acknowledge you've read our Privacy
								Policy. Notice at collection
							</div>
							<hr />
							<div>
								<Link to={"/sign-up"}>
									<p className="text-center font-bold text-lg">
										Not on Pinterest yet? Sign up
									</p>
								</Link>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default Signin;
