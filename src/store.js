export const initialState = {
    movies: [],
    runtimeMins: '',
    title: '',
    movieId:'',
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'movies':
            return {
                ...state,
                movies: action.payload,
            };
        case 'runtimeMins':
            return {
                ...state,
                runtimeMins: action.payload,
            };
        case 'title':
            return {
                ...state,
                title: action.payload,
            };
        case 'movieId':
            return {
                ...state,
                movieId: action.payload,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};
