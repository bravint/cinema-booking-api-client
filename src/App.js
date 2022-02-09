import { useEffect, useReducer } from 'react';

import { reducer, initialState } from './store';

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    console.log(`states`, state);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch(`http://localhost:4000/movie`);

            const data = await response.json();

            dispatch({ type: 'movies', payload: data });
        } catch (error) {
            console.log(`error: `, error);
        }
    };

    const postMovie = async (newMovie) => {
        const response = await fetch(`http://localhost:4000/movie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        });

        const data = await response.json();

        let newMoviesList = [...state.movies, data];

        dispatch({
            type: 'movies',
            payload: newMoviesList,
        });
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        dispatch({
            type: name,
            payload: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newMovieObject = {
            title: state.title,
            runtimeMins: state.runtime,
        };

        postMovie(newMovieObject);
        clearForm();
    };

    const clearForm = () => {
        dispatch({
            type: 'title',
            payload: initialState.title,
        });

        dispatch({
            type: 'runtime',
            payload: initialState.runtime,
        });
    };

    return (
        <>
            <h1>Add A New Film</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
                <input
                    type="text"
                    name="title"
                    placeholder="Film Title"
                    value={state.title}
                    onChange={(event) => handleChange(event)}
                />
                <input
                    type="number"
                    name="runtime"
                    placeholder="Runtime"
                    value={state.runtime}
                    onChange={(event) => handleChange(event)}
                />
                <button>Add!</button>
            </form>
            {state.movies && (
                <>
                    <h1>Currently Showing</h1>
                    <ul>
                        {state.movies.map((element, index) => {
                            return (
                                <li key={index}>
                                    <p>Title: {element.title}</p>
                                    <p>Runtime: {element.runtimeMins}</p>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </>
    );
};
