const config = {
	firebaseApiKey: String(import.meta.env.VITE_FIREBASE_APIKEY),
	firbaseAuthDomain: String(import.meta.env.VITE_FIREBASE_AUTHDOMAIN),
	firbaseProjectId: String(import.meta.env.VITE_FIREBASE_PROJECTID),
	firbaseStorageBucket: String(import.meta.env.VITE_FIREBASE_STORAGEBUCKET),
	firbaseMessageSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGESENDERID),
	firebaseAppId: String(import.meta.env.VITE_FIREBASE_APPID),
};

export default config;