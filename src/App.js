import { useEffect, useReducer } from 'react';

import { reducer, initialState } from './store';

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { movies, movieId, title, runtimeMins } = state;

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

    const PostOrPutMovieToDb = async (method, newMovie) => {
        try {
            const response = await fetch( `http://localhost:4000/movie`, fetchConfig(method, newMovie));
            const data = await response.json();
            return data
        } catch (error) {
            console.log(`error: `, error);
        }
    }

    const postMovie = async (method, newMovie) => {
        const data = PostOrPutMovieToDb(method, newMovie)

        let newMoviesList = [...movies, data];

        handleDispatch('movies', newMoviesList);
    };

    const putMovie = async (method, newMovie) => {
        const data = PostOrPutMovieToDb(method, newMovie)

    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        handleDispatch(name, value);
    };

    const handleSubmitNewMovie = (event) => {
        event.preventDefault();

        const newMovie = {
            title,
            runtimeMins,
        };

        postMovie(newMovie);

        clearFormInput('runtimeMins');
        clearFormInput('title');
    };

    const handleSubmitUpdatedMovie = (event) => {};

    const clearFormInput = (name) => {
        handleDispatch(name, initialState[name]);
    };

    const handleClick = (event) => {
        console.log(event);
        let newMovieId = event.currentTarget.id;
        newMovieId = parseInt(movieId, 10);

        handleDispatch(`movieId`, newMovieId);
    };

    return (
        <>
            <h1>Add A New Film</h1>
            <form onSubmit={(event) => handleSubmitNewMovie(event)}>
                <input
                    type="text"
                    name="title"
                    placeholder="Film Title"
                    value={title}
                    onChange={(event) => handleChange(event)}
                />
                <input
                    type="number"
                    name="runtimeMins"
                    placeholder="Runtime"
                    value={runtimeMins}
                    onChange={(event) => handleChange(event)}
                />
                <button>Add!</button>
            </form>
            {state.movies && (
                <>
                    <h1>Currently Showing</h1>
                    <ul>
                        {movies.map((element) => {
                            return (
                                <li
                                    key={element.id}
                                    id={element.id}
                                    onClick={(event) => handleClick(event)}
                                >
                                    <p>Title: {element.title}</p>
                                    <p>Runtime: {element.runtimeMins}</p>

                                    {movieId === element.id && (
                                        <form
                                            onSubmit={(event) =>
                                                handleSubmitUpdatedMovie(event)
                                            }
                                        >
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Film Title"
                                                value={title}
                                                onChange={(event) =>
                                                    handleChange(event)
                                                }
                                            />
                                            <input
                                                type="number"
                                                name="runtimeMins"
                                                placeholder="Runtime"
                                                value={runtimeMins}
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
