import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
	const { userData } = useSelector((state) => state.persistedReducer.user);
	const [signOption, setSignOption] = useState(true);

	const navigation = [
		{ name: "Home", to: "/" },
		{ name: "About", to: "/about" },
		{ name: "Contact", to: "/contact" },
		{ name: "Services", to: "/services" },
	];

	const handleSignOption = () => {
		setSignOption((prev) => !prev);
	};

	return (
		<>
			<section className="fixed w-full top-0 text-teal-800 z-50">
				<nav>
					<div className="w-full h-20 flex justify-between items-center p-3 bg-gray-100">
						<div className="logo flex text-3xl font-extrabold text-red-700 px-4 py-2">
							<button>
								<h1>Pinterest</h1>
							</button>
						</div>
						<div className="nav-items flex mx-4 text-xl font-semibold justify-between items-center gap-10">
							<ul className="flex items-center">
								{navigation.map((item) => (
									<div className="item px-3" key={item.name}>
										<Link to={item.to}>
											<button>
												<li>{item.name}</li>
											</button>
										</Link>
									</div>
								))}
							</ul>
							<div className="flex">
								{userData ? (
									<Link to={"/user/profile"}>
										<button className="my-auto">
											<div className="mr-9 relative w-full max-w-14">
												<img
													className="aspect-square rounded-full object-cover"
													src={userData.profileImage}
													alt=""
												/>
												<div className="border-4 max-w-4 max-h-4 w-full h-full rounded-full bg-green-500 absolute left-0 bottom-0"></div>
											</div>
										</button>
									</Link>
								) : (
									<Link
										to={
											signOption ? "/sign-up" : "/sign-in"
										}
									>
										<button
											onClick={handleSignOption}
											className="bg-red-500 px-3 py-2 rounded-2xl text-white"
										>
											{signOption ? "Sign Up" : "Sign In"}
										</button>
									</Link>
								)}
							</div>
						</div>
					</div>
				</nav>
			</section>
		</>
	);
};

export default Header;
