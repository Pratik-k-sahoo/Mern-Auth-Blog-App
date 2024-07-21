import { useDispatch } from "react-redux";
import { login } from "../../context/User/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "../../firebase";

const OAuth = ({ setLoading }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleGoogleSignIn = async () => {
		try {
			setLoading(true);
			const provider = new GoogleAuthProvider();
			const auth = getAuth(app);
			const result = await signInWithPopup(auth, provider);
			const formData = {
				username: result.user.uid,
				fullname: result.user.displayName,
				email: result.user.email,
				contact: result.user.phoneNumber,
				profileImage: result.user.photoURL,
				accessToken: result.user.stsTokenManager.accessToken,
				refreshToken: result.user.stsTokenManager.refreshToken,
				expirationTime: result.user.stsTokenManager.expirationTime,
			};
			const response = await axios.post("/api/auth/google", formData);
			setLoading(false);
			dispatch(login(response.data));
			navigate("/");
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<>
			<button
				type="button"
				onClick={handleGoogleSignIn}
				className="text-black border-black border-2 w-full rounded-3xl py-2 text-xl font-bold"
			>
				Continue with Google
			</button>
		</>
	);
};

export default OAuth;
