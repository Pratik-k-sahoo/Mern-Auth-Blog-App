import { useEffect, useRef, useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import {
	deleteObject,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import {
	updateUser,
	updateUserFailure,
	logout,
	deleteUser,
	deleteUserFailure,
} from "../context/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const EditProfile = ({ className, setDisplay }) => {
	const { userData, error } = useSelector(
		(state) => state.persistedReducer.user
	);
	const [image, setImage] = useState(null);
	const [formData, setFormData] = useState(userData);
	const [loading, setLoading] = useState(0);
	const [uploadError, setUploadError] = useState(false);
	const fileRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setFormData(userData);
	}, [userData]);

	useEffect(() => {}, []);

	const handleImageUpload = async (image) => {
		try {
			const storage = getStorage(app);
			const fileName = new Date().getTime() + image.name;
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, image);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setLoading(Math.round(progress));
				},
				(error) => {
					console.log(error);
					setUploadError(true);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						(downloadUrl) => {
							console.log(fileName);
							console.log(downloadUrl);
							setImage(fileName);
							setFormData({
								...formData,
								profileImage: downloadUrl,
							});
						}
					);
				}
			);

			setTimeout(() => {
				setLoading(0);
				setUploadError(false);
			}, 5000);
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileInputChange = (e) => {
		handleImageUpload(e.target.files[0]);
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			setLoading(1);
			const response = await axios.post(
				`/api/user/update/${formData._id}`,
				formData
			);
			setLoading(0);
			dispatch(updateUser(response.data));
			setDisplay("hidden");
			setFormData(userData);
			fileRef.current.value = null;
		} catch (error) {
			setLoading(0);
			if (error.response != undefined) {
				if (error.response.data.error != undefined) {
					dispatch(updateUserFailure(error.response.data.error));
				}
			} else dispatch(updateUserFailure(error.message));
		}
	};

	const handleCancel = () => {
		setDisplay("hidden");
		if (image) {
			const storage = getStorage(app);
			const storageRef = ref(storage, image);
			deleteObject(storageRef)
				.then(() => setImage({}))
				.catch((err) => console.log(err));
		}
		setFormData(userData);
		fileRef.current.value = null;
	};

	const handleUserLogout = async () => {
		try {
			await axios.get("/api/auth/signout");
			dispatch(logout());
		} catch (error) {
			console.log(error);
		}
	};

	const handleUserDelete = async () => {
		try {
			setLoading(1);
			await axios.delete(`/api/user/delete/${formData._id}`);
            dispatch(deleteUser());
            setLoading(0);
		} catch (error) {
			setLoading(0);
			if (error.response != undefined) {
				if (error.response.data.error != undefined) {
					dispatch(deleteUserFailure(error.response.data.error));
				}
			} else dispatch(deleteUserFailure(error.message));
		}
	};

	return (
		<>
			<section className={`${className}`}>
				<div className="flex flex-col items-center gap-9 mx-auto w-full max-w-[500px]">
					<div className="text-center flex flex-col gap-3 font-bold text-3xl">
						<h1>PROFILE</h1>
						<div className="max-w-32 max-h-32 h-full mx-auto w-full border-gray-500 border-4 rounded-full relative">
							<input
								id="profileImage"
								type="file"
								name="profileImage"
								onChange={handleFileInputChange}
								hidden
								ref={fileRef}
								accept="image/*"
							/>
							<img
								src={formData.profileImage}
								className="aspect-square rounded-full object-cover"
								alt=""
							/>
							<span
								className="absolute text-center bottom-0 bg-gray-700 cursor-pointer right-0 max-w-8 max-h-8 h-full rounded-full py-1 px-2 text-white w-full"
								onClick={() => fileRef.current.click()}
							>
								<BsPencilFill className="max-w-5 w-full" />
							</span>
						</div>
						<div className="w-full">
							{uploadError && (
								<p className="text-red-600">Error uploading</p>
							)}
							{loading && loading > 0 && loading < 100 ? (
								<p className="text-red-600">
									Uploading image {loading}%
								</p>
							) : loading && loading === 100 ? (
								<p className="text-green-600">
									Image uploaded successfully
								</p>
							) : null}
						</div>
					</div>
					<div className="flex justify-center flex-col items-center max-w-[500px] gap-3 p-3 w-full">
						<input
							value={formData.username}
							type="text"
							id="username"
							name="username"
							readOnly
							onChange={handleInputChange}
							className="bg-gray-200 px-5 py-3 rounded-xl w-full cursor-not-allowed"
						/>
						<input
							value={formData.fullname}
							type="text"
							id="fullname"
							name="fullname"
							onChange={handleInputChange}
							className="bg-gray-200 px-5 py-3 rounded-xl w-full"
						/>
						<input
							value={formData.email}
							type="email"
							id="email"
							name="email"
							readOnly
							onChange={handleInputChange}
							className="bg-gray-200 px-5 py-3 rounded-xl w-full cursor-not-allowed"
						/>
						<input
							value={formData.contact}
							type="text"
							id="contact"
							name="contact"
							onChange={handleInputChange}
							className="bg-gray-200 px-5 py-3 rounded-xl w-full cursor-not-allowed"
						/>
						<input
							value={formData.password || ""}
							type="password"
							id="password"
							name="password"
							placeholder="Password"
							onChange={handleInputChange}
							className="bg-gray-200 px-5 py-3 rounded-xl w-full"
						/>
						<button
							disabled={loading && loading !== 0 ? true : false}
							className={`bg-gray-700 text-white px-5 py-3 rounded-xl w-full ${
								loading && loading !== 0
									? "cursor-not-allowed"
									: ""
							}`}
							onClick={handleUpdate}
						>
							Update
						</button>
						{error && error !== "false" && (
							<p className="text-red-500 text-center">
								{error || "Something went wrong"}
							</p>
						)}
						<button
							disabled={loading && loading !== 0 ? true : false}
							className={`bg-gray-700 text-white px-5 py-3 rounded-xl w-full ${
								loading && loading !== 0
									? "cursor-not-allowed"
									: ""
							}`}
							onClick={handleCancel}
						>
							Cancel
						</button>
						<div className="flex justify-between w-full px-2 text-red-600">
							<button onClick={handleUserDelete}>
								<p>Delete Account</p>
							</button>
							<button onClick={handleUserLogout}>
								<p>Sign out</p>
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default EditProfile;
