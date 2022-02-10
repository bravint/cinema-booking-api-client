import { useEffect, useReducer } from 'react';

import { reducer, initialState } from './store';

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    console.log(`states`, state);

    const handleDispatch = (type, payload) => {
        dispatch({
            type,
            payload,
        });
    };

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

    const fetchConfig = (method, body) => {
        return {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
    };

    const postMovie = async (newMovie) => {
        const response = await fetch( `http://localhost:4000/movie`, fetchConfig('POST', newMovie));

        const data = await response.json();

        let newMoviesList = [...state.movies, data];

        handleDispatch('movies', newMoviesList);
    };

    const putMovie = async (updatedMovie) => {
        const response = await fetch( `http://localhost:4000/movie`, fetchConfig('PUT', updatedMovie));

        const data = await response.json();
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        handleDispatch(name, value);
    };

    const handleSubmitNewMovie = (event) => {
        event.preventDefault();

        const newMovie = {
            title: state.title,
            runtimeMins: state.runtime,
        };

        postMovie(newMovie);

        clearFormInput('runtime');
        clearFormInput('title');
    };

    const handleSubmitUpdatedMovie = (event) => {

    }

    const clearFormInput = (name) => {
        handleDispatch(name, initialState[name]);
    };

    const handleClick = (event) => {
        console.log(event)
        let movieId = event.currentTarget.id;
        movieId = parseInt(movieId, 10);

        handleDispatch(`movieId`, movieId);
    };

    return (
        <>
            <h1>Add A New Film</h1>
            <form onSubmit={(event) => handleSubmitNewMovie(event)}>
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
                        {state.movies.map((element) => {
                            return (
                                <li
                                    key={element.id}
                                    id={element.id}
                                    onClick={(event) => handleClick(event)}
                                >
                                    <p>Title: {element.title}</p>
                                    <p>Runtime: {element.runtimeMins}</p>

                                    {state.movieId === element.id && (
                                        <form
                                            onSubmit={(event) =>
                                                handleSubmitUpdatedMovie(event)
                                            }
                                        >
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Film Title"
                                                value={state.title}
                                                onChange={(event) =>
                                                    handleChange(event)
                                                }
                                            />
                                            <input
                                                type="number"
                                                name="runtime"
                                                placeholder="Runtime"
                                                value={state.runtime}
                                                onChange={(event) =>
                                                    handleChange(event)
                                                }
                                            />
                                            <button>Edit!</button>
                                        </form>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </>
    );
};
