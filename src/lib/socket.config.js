import { io } from "socket.io-client";
import { API_DOMAIN } from "./constants";

const socket = io(API_DOMAIN); // Replace NEXT_PUBLIC_SOCKET_SERVER_URL with your actual server URL

export default socket;
