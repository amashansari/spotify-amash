export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('saveSong');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('saveSong', serializedState);
    } catch (error) {

    }
}