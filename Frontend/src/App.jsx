import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, About, Signin, Signup, Profile, Header, EditProfile } from "./components";
import Private from "./components/Private/Private";

const App = () => {

	return (
		<BrowserRouter>
			<Header />
			<section className="mt-20 p-8">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/sign-in" element={<Signin />} />
					<Route path="/sign-up" element={<Signup />} />
					<Route path="/user" element={<Private />}>
						<Route path="profile" element={<Profile />} />
						<Route path="edit-profile" element={<EditProfile />} />
					</Route>
				</Routes>
			</section>
			<h1>Mern Auth Blog App</h1>
		</BrowserRouter>
	);
};

export default App;
