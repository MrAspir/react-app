class LocalStorage {
    load (key) {
        try {
            const serializedState = localStorage.getItem(key);

            if (serializedState === null) {
                return undefined;
            }

            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    }

    save (key, state) {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (err) {
            // Die
        }
    }
}

export default new LocalStorage();
