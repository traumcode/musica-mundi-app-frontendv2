import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
		getSearchDetails(artistName.replaceAll("%20", " ")).then((data) => {
			if (data.artists.items.length !== 0) {
				getRelatedArtist(data.artists.items[0]?.id).then((data2) => {
					console.log(data2)
					setRelatedArtists(data2)
				})
				getArtistTopTracks(data.artists.items[0]?.id).then((data3) => {
					console.log(data3)
					setTopTracks(data3)
				})
			} else {
				console.log("NOTHING")
			}
		})
	}, [ artistName ])

	useEffect(() => {
		setData(props, currentPage).then(r => console.log(r));
	}, [ props, currentPage ]);
	console.log(artistName.replaceAll("%20", " "))

	return (
		<div className="artist-details-content">
			<div className='artist-details-info'>
				<h1>▲</h1>
				<h1>{artistDetails.name}</h1>
				<img className='artist-details-photo' src={props.location.state.artist.cover_image} alt=""/>
				{artistDetails.profile ? (<><h5 className='info-title'> &nbsp;<i className="fas fa-info-circle"/></h5>
					<div style={{ textAlign: 'initial' }}>
						<p className='artist-details-info-text'>{artistDetails.profile}</p>
					</div>
				</>) : (<></>)}
				{artistDetails.urls ? (<><h5 className='info-title'> &nbsp;<i className="fas fa-link"/></h5>
					<div style={{ textAlign: 'initial' }}>
						{artistDetails?.urls?.map(function (link, index) {
							return (
								<Link to='https://mujux.com'>
									<p key={index} className='artist-details-info-text'>{link}</p>
								</Link>
							)
						})}
					</div>
				</>) : (<>NO LINKS</>)}
				{artistDetails.members ? (<><h5 className='info-title'> &nbsp;<i className="fas fa-users"/></h5>
					<div style={{ textAlign: 'initial' }}>
						<p className='artist-details-info-text'>
							{artistDetails?.members?.map(function (member, index) {
								return (
									<Link to={member.resource_url} style={{ textDecoration: 'none' }}>{member.name}, </Link>
								)
							})}
						</p>
					</div>
				</>) : (<></>)}
			</div>
			<div className='artist-details-releases'>
				<h1>▲</h1>
			</div>
		</div>
	);
}

export default ArtistDetails;