import { initializeApp } from "firebase/app";
import config from "./config/config"; 

const firebaseConfig = {
	apiKey: config.firebaseApiKey,
	authDomain: config.firbaseAuthDomain,
	projectId: config.firbaseProjectId,
	storageBucket: config.firbaseStorageBucket,
	messagingSenderId: config.firbaseMessageSenderId,
	appId: config.firebaseAppId,
};

const app = initializeApp(firebaseConfig);

export default app;
