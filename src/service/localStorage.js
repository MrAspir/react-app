const loadState = (key) => {
    try {
        const serializedState = localStorage.getItem(key);

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (key, state) => {
    try {
        localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
        // die
    }
};

export {
    loadState,
    saveState
}
