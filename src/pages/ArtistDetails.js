import React, { useEffect, useState } from "react";
import { getArtistDetails, getArtistReleases } from "../apis/fetchData";
import { getArtistTopTracks, getRelatedArtist, getSearchDetails } from "../apis/fetchDataSpotify";


function ArtistDetails(props) {
	const [ artistName, setArtistName ] = useState(window.location.pathname.substring(8).replace("%20", " "));
	const [ artistReleases, setArtistReleases ] = useState([]);
	const [ relatedArtists, setRelatedArtists ] = useState([]);
	const [ topTracks, setTopTracks ] = useState([]);
	const [ artistDetails, setArtistDetails ] = useState([]);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ pagesNumber, setPagesNumber ] = useState();

	const handlePages = (event, value) => {
		setCurrentPage(value);
	};

	const setData = async (props, currentPage) => {
		setIsLoading(true);
		let data = await getArtistReleases(props.location?.state?.artist.id, currentPage);
		setArtistReleases(data?.releases);

		const data2 = await getArtistDetails(props.location.state?.artist.id);
		setArtistDetails(data2);
		console.log(data2)
		setPagesNumber(data?.pagination.pages);
		setIsLoading(false);
	};

	useEffect(() => {
		getSearchDetails(artistName).then((data) => {
			if (data.artists.items) {
				getRelatedArtist(data.artists.items[0].id).then((data2) => {
					console.log(data2)
					setRelatedArtists(data2)
				})
				getArtistTopTracks(data.artists.items[0].id).then((data3) => {
					console.log(data3)
					setTopTracks(data3)
				})
			}
		})
	}, [ artistName ])

	useEffect(() => {
		setData(props, currentPage).then(r => console.log(r));
	}, [ props, currentPage ]);

	return (
		// <div className="artist-details-content">
		// 	<div className="artist-photo-and-info">
		// 		<div className="artist-photo">
		// 			<img  className="photo" src={props.location.state.artist.cover_image} alt=""/>
		// 			<img  src={props.location.state.artist.cover_image} alt=""/>
		// 		</div>
		// 		<div className="artist-info"/>
		// 	</div>
		// </div>
		<div className="artist-details-content">
			<div className='artist-details-info'>
				<h1>~ </h1>
				<img className='artist-details-photo' src={props.location.state.artist.cover_image} alt=""/>
				<h5 className='info-title'>info:</h5>
				<div style={{textAlign: 'initial'}}>
					<p className='artist-details-info-text'>{artistDetails.profile}</p>
				</div>
			</div>
			<div className='artist-details-releases'>
				<h1>RELEASES</h1>

			</div>
		</div>
	);
}

export default ArtistDetails;