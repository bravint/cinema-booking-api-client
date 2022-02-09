import { useEffect, useState } from 'react';

export const App = () => {
    const [movie, setMovie] = useState();
    const [title, setTitle] = useState('');
    const [runtime, setRuntime] = useState();
    const [submit, setSubmit] = useState(false);

    console.log(`states`, {
        movie,
        title,
        runtime,
        submit,
    });

    useEffect(() => {
        fetchFilms();
    }, []);

    useEffect(() => {
        if (!submit) return;

        const postNewFilm = async (DataToPost) => {
            const response = await fetch(`http://localhost:4000/movie`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(DataToPost),
            });
            const data = await response.json();
            console.log(`data posted`, data);
            await fetchFilms();
        };

        const newMovieObject = { title: title, runtimeMins: runtime };

        postNewFilm(newMovieObject)
        .then(clearForm())
        .then(setSubmit(false))
    }, [submit, title, runtime]);

    const fetchFilms = async () => {
        try {
            const response = await fetch(`http://localhost:4000/movie`);
            const data = await response.json();
            console.log(`data fetched`, data);
            setMovie(data);
        } catch (error) {
            console.log(`error: `, error);
        }
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'title') setTitle(value);
        if (name === 'runtimeMins') setRuntime(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmit(true);
    };

    const clearForm = () => {
        setTitle('')
        setRuntime('')
    }

    return (
        <>
            <h1>Add A New Film</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
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
                    value={runtime}
                    onChange={(event) => handleChange(event)}
                />
                <button>Add!</button>
            </form>
            {movie && (
                <>
                    <h1>Currently Showing</h1>
                    <ul>
                        {movie.map((element) => {
                            return (
                                <li>
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
