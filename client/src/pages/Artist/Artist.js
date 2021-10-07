import './Artist.css'
import { Row, Col, Container} from "react-bootstrap";
import ArtistThumbnail from "../../components/ArtistThumbnail/artistThumbnail";
import ArtistDescription from "../../components/ArtistDescription/artistDescription";
import TopSongs from "../../components/TopSongs/topSongs";
import TopAlbums from "../../components/TopAlbums/topAlbums";
import SuggestedArtists from "../../components/SuggestedArtists/suggestedArtists";
import LineChartStats from "../../components/LineChartStats/lineChartStats";
import {useEffect, useState} from "react";
import axios from 'axios';
import {useParams} from "react-router";
import {useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// function getYoutubeTrack(artistName, songName){
//     const query = artistName + ' ' + songName;
//     return axios.get("http://localhost:4000/api/track?search_string=" + query);
// }
function getArtist(name, spotifyId, geniusId, setArtist){
    // let url = `http://${process.env.REACT_APP_DOMAIN_NAME}:3030/api/artist?`;
    let url = `${process.env.REACT_APP_MAIN_SERVICE}/artist?`;
    if(name){
        url += `name=${name}`;
    }
    if(spotifyId){
        url += `&spotifyId=${spotifyId}`;
    }
    if(geniusId){
        url += `&geniusId=${geniusId}`;
    }
    url = encodeURI(url);
    return new Promise(resolve => {
        axios.get(url)
            .then(response => {
                console.log("Artist Response: ", response.data.data)
                setArtist(response.data.data);
                resolve(response.data.data);
            }).catch(error => {
            console.log(error);
        });
    });
}
function Artist(){
    let query = useQuery();
    const { name } = useParams();
    const spotifyId = query.get("spotifyId");
    const geniusId = query.get("geniusId");

    const [artist, setArtist] = useState(null);
    const [topTracks, setTopTracks] = useState(null);
    const [topAlbums, setTopAlbums] = useState(null);
    const [relatedArtists, setRelatedArtists] = useState(null);
    const [artistIsPending, setArtistIsPending] = useState(true);
    const [topTracksIsPending, setTopTracksIsPending] = useState(true);

    useEffect(()=>{
        getArtist(name, spotifyId, geniusId, setArtist).then(value => {
            setArtistIsPending(false);
            const artistSpotifyId = value.spotify.id;
            // axios.get(encodeURI(encodeURI(`http://${process.env.REACT_APP_DOMAIN_NAME}:3030/api/artist/top_tracks?artistSpotifyId=${artistSpotifyId}`)))
            axios.get(encodeURI(encodeURI(`${process.env.REACT_APP_MAIN_SERVICE}/artist/top_tracks?artistSpotifyId=${artistSpotifyId}`)))
                .then(response => {
                    setTopTracksIsPending(false);
                    var tracks = response.data.data.tracks;
                    console.log("Top Tracks Response: ", tracks);
                    setTopTracks(tracks);
                }).catch(error => {
                console.log(error)
            });

            // axios.get(encodeURI(`http://${process.env.REACT_APP_DOMAIN_NAME}:3030/api/artist/albums?id=${artistSpotifyId}&page=0`))
            axios.get(encodeURI(`${process.env.REACT_APP_MAIN_SERVICE}/artist/albums?id=${artistSpotifyId}&page=0`))
                .then(response => {
                    console.log(" Spotify Albums Response: ", response.data.data.albums);
                    let uniqueAlbumsArray = [];
                    response.data.data.albums.forEach(function(item){
                        let i = uniqueAlbumsArray.findIndex(x => x.name === item.name);
                        if(i <= -1){
                            uniqueAlbumsArray.push(item);
                        }
                    });
                    setTopAlbums(Array.from(uniqueAlbumsArray));
                }).catch(error => {
                console.log(error)
            });
            // axios.get(encodeURI(`http://${process.env.REACT_APP_DOMAIN_NAME}:3030/api/artist/related?id=${artistSpotifyId}`))
            axios.get(encodeURI(`${process.env.REACT_APP_MAIN_SERVICE}/artist/related?id=${artistSpotifyId}`))
                .then(response => {
                    console.log(" Spotify Related Artists Response: ", response.data.data.artists)
                    setRelatedArtists(response.data.data.artists);
                }).catch(error => {
                console.log(error)
            });
        });
    },[name]);

    return (
        <>
            {artistIsPending &&
            <div className="ArtistSpinner spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>}
        {artist &&
        <Container style={{marginTop:"2em"}}>
            <div className="shadow p-3 mb-5 bg-white rounded">
            <Row>
                <Col className="ArtistThumbnailCol" sm={12} md={6} lg={4}>
                    {artist && <ArtistThumbnail imageUrl={artist.spotify.image}/>}
                </Col>
                <Col className="ArtistInfoDescriptionCol" sm={12} md={6} lg={8}>
                    {artist && <ArtistDescription spotify={artist.spotify} genius={artist.genius}/>}
                </Col>
            </Row>
            <Row>

                <Col className="d-flex justify-content-center" sm={12} md={6} lg={{span: 4, offset: 1}}>
                    {topTracksIsPending &&
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>}
                    {topTracks && <TopSongs topTracks={topTracks} artistName={artist.spotify.name}/>}
                </Col>
                <Col  className="d-flex justify-content-center" sm={12} md={6} lg={{span: 4, offset: 2}}>
                    {topAlbums && <TopAlbums topAlbumsSpotify={topAlbums}
                                             artistName={artist.spotify.name} artistId={artist.spotify.id}/>}
                </Col>
            </Row>

            <Row>
                {artist && artist.spotify && artist.spotify.stats && artist.spotify.stats.length > 0 &&
                <>
                    <LineChartStats data={artist.spotify.stats}/>
                </>
                }
            </Row>

            <Row>
                {relatedArtists && <SuggestedArtists suggestedArtists={relatedArtists}/>}
            </Row>
            </div>
        </Container>
    }
    </>
    );
}

export default Artist;