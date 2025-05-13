import { tryToConnect } from "./utils.js";

const isConnected = await tryToConnect();
if (isConnected) window.location.replace("http://localhost:3000/profile");
