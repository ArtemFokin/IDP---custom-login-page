export const IDENTITY_SERVER_URI = import.meta.env.VITE_IDENTITY_SERVER_URI;
if (!IDENTITY_SERVER_URI) {
  throw new Error("VITE_IDENTITY_SERVER_URI env not found");
}
export const WALLET_API_URI = import.meta.env.VITE_WALLET_API_URI;
if (!WALLET_API_URI) {
  throw new Error("VITE_WALLET_API_URI env not found");
}
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
if (!GOOGLE_CLIENT_ID) {
  throw new Error("VITE_GOOGLE_CLIENT_ID env not found");
}
