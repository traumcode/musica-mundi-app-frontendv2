import React, { useEffect, useState } from "react";
import { genresAPI, getSearchDetailsAPI } from "../apis/fetchData";
import { useHistory } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import SearchBar from "../components/SearchBar";


function Discover(props) {
	const params = new URLSearchParams(window.location.search)
	const artistParam = params.get('artist');
	const pageParam = params.get('page');
	const styleParam = params.get('style');
	const genreParam = params.get('genre');

	const [ artists, setArtist ] = useState([]);
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
			}, 2000)
		});
		return () => console.log("clear")
	}, [searchGenre, searchArtist, searchStyle, currentPage, history, searchStyles]);

	return (
		<div className="discover-content">
			<h1>surf the waves ~</h1>
			<div className="discover-genres">
				{Object?.values(genres).map((genre, index) => {
					return (
						<div className="genre-item" key={index} onClick={() => {
							setSearchGenre(genre.utils.genre);
							setSearchStyles(genre.styles);
						}}>
							<img src={genre.utils.photo} alt='' className="genre-photo"/>
							<div className="genre-overlay">
								<div className="overlay-text">{genre.utils.genre.replace("+", "")}</div>
							</div>
						</div>
					)
				})}
			</div>
			<div className="styles-container">
				{searchStyles
					? Object.keys(searchStyles)?.map((style) => {
						return (
							<div key={style} className="styles-box" style={{ margin: "0" }}>
								<div onClick={() => setSearchStyle(style)} className="styles-button styles-button-three">
									<span>{style}</span>
								</div>
							</div>
						);
					})
					: ""}
			</div>
			<div className="title-search-artist">
				<div className="title">
					<p className="line-title">surf </p>
					<p className="line-title">some </p>
					{searchGenre ? (
						<div className="title-two">
							<p className="text-genre">{searchGenre.replace("+", " ")}</p>
							<button
								className="cancel-genre"
								onClick={() => {
									setSearchGenre("");
									setCurrentPage(1);
									setSearchStyles("");
									setSearchStyle("");
								}}
							>
								x
							</button>
						</div>
					) : (
						""
					)}

					<p className="line-title">waves</p>
				</div>
				<SearchBar placeholder="enter a name of artist or album" handleSearch={handleKeyPress} />
			</div>
			<div className="discover-results" style={isLoading ? {height: "100vh"} : {height: "100%"}}>
			{isLoading ? (
				<div className="loading-spinner">
					<BarLoader
						color={"#30daa8"} loading={isLoading} height={3} width={600}/>
				</div>
			) : (

					<div className="row row-cols-1 row-cols-sm-auto g-2 g-lg-3">
						{artists?.map((artist, index) => {
							return (
								<div key={index} className="col">
									<div className="card">
										<a href="" className="card-profile">
											<img src={`${artist.cover_image}`} alt=""/>
										</a>
										<div className="card-body">
											<h5 className="">{artist.type}</h5>
											<h2 className="card-text">{artist.title}</h2>
											<i className="bi bi-caret-right card-icon"/>"
										</div>
									</div>
								</div>
							)
						},)}
				</div>
			)}
		</div>
		</div>
	);
}

export default Discover;