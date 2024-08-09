import storage from "utils/storage";

export default function useAuth() {
	const token = storage.get("access_token");

	return {
		isLoggedIn: !!token,
	};
}
