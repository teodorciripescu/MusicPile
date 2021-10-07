import './Track.css'
import { Row, Col, Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from 'axios';
import {useParams} from "react-router";
import {useLocation} from "react-router-dom";
import TrackThumbnail from '../../components/TrackThumbnail/trackThumbnail'
import TrackDescription from '../../components/TrackDescription/trackDescription'
import TrackArtists from '../../components/TrackArtists/trackArtists'
import TrackProducerWriterArtists from '../../components/TrackProducerWriterArtists/trackProducerWriterArtists'
import TrackAudioFeatures from '../../components/TrackAudioFeatures/trackAudioFeatures'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function getYotubeIframe(videoUrl){
    return new Promise(resolve => {
        const url = encodeURI(`https://www.youtube.com/oembed?url=${videoUrl}&format=json`);
        axios.get(url).then(response => {
            resolve(response.data.html);
        }).catch(error => {
            console.log(error);
            resolve(null);
        });
    });
}
function getTrack(name, spotifyId, geniusId, setTrack){
    // let url = `http://${process.env.REACT_APP_DOMAIN_NAME}:3030/api/track?`;
    let url = `${process.env.REACT_APP_MAIN_SERVICE}/track?`;
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
                console.log("Track Response: ", response.data.data)
                setTrack(response.data.data);
                resolve(response.data.data);
            }).catch(error => {
            console.log(error);
        });
    });
}
function Track(){
    let query = useQuery();
    const { name } = useParams();
    const spotifyId = query.get("spotifyId");
    const geniusId = query.get("geniusId");

    const [track, setTrack] = useState(null);
    const [trackYoutubeVideo, setTrackYoutubeVideo] = useState(null);
    const [trackIsPending, setTrackIsPending] = useState(true);

    useEffect(()=>{
        getTrack(name, spotifyId, geniusId, setTrack).then(value => {
            setTrackIsPending(false);
            if(value.genius.hasOwnProperty('id')){
                const linkArray = value.genius.media.filter(mediaItem =>{
                    return mediaItem.provider === 'youtube';
                })
                if(linkArray.length){
                    getYotubeIframe(linkArray[0].url).then(ytResult => {
                       setTrackYoutubeVideo(ytResult);
                    });
                }
            }
        });
    },[name]);

    return (
        <Container style={{marginTop:"2em"}}>
            <div className="shadow p-3 mb-5 bg-white rounded">
            {trackIsPending &&
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>}
            <Row style={track && track.genius.id && {background: track.genius.song_art_primary_color, color: track.genius.song_art_text_color}}>
                <Col className="TrackThumbnailCol" sm={12} md={6} lg={4}>
                    { track &&
                        (() => {
                            if(track.genius.id)
                                return <TrackThumbnail imageUrl={track.genius.song_art_image_url}/>
                            else if(track.spotify.basic)
                                return <TrackThumbnail imageUrl={track.spotify.basic.album.images[0].url}/>
                        })()
                    }
                </Col>
                <Col className="TrackInfoDescriptionCol" sm={12} md={6} lg={8}>
                    {track && <TrackDescription spotify={track.spotify} genius={track.genius} />}
                </Col>
            </Row>

            <Row>
                {track && track.genius && track.genius.description &&
                <Col className="TrackPlainTextDescription" sm={12} md={6} lg={8}>
                    <h2>Description</h2>
                    <p>{track.genius.description.plain}</p>
                    {trackYoutubeVideo && <div className="embed-responsive embed-responsive-16by9">
                        <div dangerouslySetInnerHTML={{__html: trackYoutubeVideo}} />
                    </div>
                        }
                </Col>
                }
                <Col sm={12} md={6} lg={4}>
                    {track && track.spotify && track.spotify.audio_features &&
                    <TrackAudioFeatures audioFeatures={track.spotify.audio_features}/>
                    }
                </Col>
            </Row>

            <Row>
                {track && track.spotify && track.spotify.basic && track.spotify.basic.artists &&
                <TrackArtists artists={track.spotify.basic.artists}/>
                }
            </Row>

            <Row>
                {track && track.genius && track.genius.producer_artists &&
                <TrackProducerWriterArtists producers={track.genius.producer_artists} writers={track.genius.writer_artists}/>
                }
            </Row>
            {/*<Row>*/}
            {/*    <Col sm={12} md={6} lg={{span:4, offset: 1}}>*/}
            {/*        {topTracks && <TopSongs topTracks={topTracks}/>}*/}
            {/*    </Col>*/}
            {/*    <Col sm={12} md={6} lg={{span:4, offset: 2}}>*/}
            {/*        {topAlbums && <TopAlbums topAlbumsSpotify={topAlbums}/>}*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            </div>
        </Container>
    );
}

export default Track;