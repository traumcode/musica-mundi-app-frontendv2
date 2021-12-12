import React, { useEffect, useState } from "react";
import { genresAPI, getSearchDetailsAPI } from "../apis/fetchData";
import { useHistory } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/react";


function Discover(props) {
	const params = new URLSearchParams(window.location.search)
	const artistParam = params.get('artist');
	const pageParam = params.get('page');
	const styleParam = params.get('style');
	const genreParam = params.get('genre');

	const [ artist, setArtist ] = useState([]);
	const [ searchArtist, setSearchArtist ] = useState(artistParam || "");
	const [ searchGenre, setSearchGenre ] = useState(genreParam || "");
	const [ searchStyle, setSearchStyle ] = useState(styleParam || "");
	const [ searchStyles, setSearchStyles ] = useState("");
	const [ currentPage, setCurrentPage ] = useState(parseInt(pageParam) || 1);
	const [ pagesNumber, setPagesNumber ] = useState();
	const [ resultsNumber, setResultsNumber ] = useState();
	const [ isLoading, setIsLoading ] = useState(true);

	const genres = genresAPI();
	let history = useHistory();

	const handleKeyPress = (event) => {
		if (event.key === "Enter" && event.target.value === "") {
			setSearchArtist(event.target.value);
			setCurrentPage(1);
		} else if (event.key === "Enter") {
			setSearchArtist(event.target.value);
		}
	};

	const handlePages = (event, value) => {
		setCurrentPage(value);
	};

	useEffect(() => {
		history.push(`/discover?artist=${searchArtist}&page=${currentPage}`)
		getSearchDetailsAPI(searchArtist, searchGenre, searchStyle, currentPage).then((data) => {
			setResultsNumber(data.pagination?.items);
			setArtist(data.results);
			setPagesNumber(data.pagination?.pages);
			setTimeout(() => {
				setIsLoading(false);
			}, 5000);
		});
	}, [ searchGenre, searchArtist, searchStyle, currentPage, history ]);

	return (
		<div className="discover-content">
			<h1>DISCOVER PAGE</h1>
			{isLoading ? (
				<PacmanLoader color={"#6de5c2"} loading={isLoading} size={50}/>
			) : (
				<h1>Finished loading</h1>
			)}
		</div>
	);
}

export default Discover;