class Storage {
	set = (key: string, data: any) => {
		localStorage.setItem(key, JSON.stringify(data));
	};

	get = (key: string): any => {
		return JSON.parse(localStorage.getItem(key as string) ?? "null");
	};

	remove = (key: string) => localStorage.removeItem(key);

	clear = () => localStorage.clear();

	upsert = (key: string, data: any) => {
		const existing = this.get(key);

		if (existing) {
			this.set(key, { ...existing, ...data });
		}
	};
}

const storage = new Storage();

export default storage;
