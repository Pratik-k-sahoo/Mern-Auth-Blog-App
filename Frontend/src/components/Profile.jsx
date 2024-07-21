import React, { useState } from "react";
import { useSelector } from "react-redux";

import EditProfile from "./EditProfile";

const Profile = () => {
	const { userData } = useSelector((state) => state.persistedReducer.user);
    const [display, setDisplay] = useState("hidden");

    const handleEdit = () => {
        setDisplay(
			"block absolute left-[50%] top-[60%] translate-x-[-50%] translate-y-[-50%] bg-transparent backdrop-blur-sm w-full z-40"
		);
    }
	return (
		<>
			<section className="">
				<EditProfile
					userData={userData}
					className={display}
					setDisplay={setDisplay}
				/>
				<div className="w-full h-screen bg-white">
					<div className="w-full max-h-[46%]">
						<div className="max-w-[600px] h-full mx-auto flex flex-col items-center gap-10 py-7">
							<div className="w-full flex flex-col items-center gap-3">
								<div
									className="max-w-32 mx-auto w-full max-h-32 h-full"
								>
									<img
										src={userData.profileImage}
										alt=""
										className="aspect-square rounded-full object-cover"
									/>
								</div>
								<div className="text-center">
									<h1 className=" text-2xl font-bold">
										{userData.fullname}
									</h1>
									<h2 className="text-xl font-semibold">
										@{userData.username}
									</h2>
								</div>
							</div>
							<button
								className="bg-gray-300 px-4 py-2 rounded-3xl cursor-pointer text-lg font-semibold"
								onClick={handleEdit}
							>
								EDIT
							</button>
						</div>
					</div>

					<div className="flex justify-between px-8 mt-2">
						<button className="bg-red-700 px-3 py-2 rounded-lg text-white font-bold">
							Short Post
						</button>
						<button className="bg-red-700 px-3 py-2 rounded-lg text-white font-bold">
							Add New Post
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default Profile;
