export const initialState = {
    movies: [],
    runtime: '',
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
        case 'runtime':
            return {
                ...state,
                runtime: action.payload,
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
