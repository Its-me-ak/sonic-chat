export interface Message {
  id: number;
  senderId: string;
  content: string;
  messageType: "text" | "image";
  timestamp?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}