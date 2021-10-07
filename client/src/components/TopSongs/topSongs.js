import './topSongs.css'
import {Container, ListGroup} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import {Image} from "react-bootstrap";

function topSongs({topTracks, artistName}){
    return (
        <Container className="topSongsContainer">
            <h2 className="topSongsTitle">Top Songs</h2>
            <ListGroup variant="flush">
                {topTracks.map(track => (
                    <ListGroup.Item key={track.spotify.id}>
                        <Badge className="artistDescriptionBagde" variant="success">{track.spotify.popularity}</Badge>
                        <a href={track.spotify.external_urls.spotify}>
                            <Image className="SpotifyTrackLogo" src="/Spotify_Icon_RGB_Black.png"/>
                        </a>
                        {track.genius && track.genius.media && track.genius.media.map( platform => (
                            ( platform.provider === 'youtube' && <a href={platform.url} key={`${track.spotify.id}_youtube`}>
                                <Image className="YoutubeTrackLogo" src="/yt_icon_rgb.png"/>
                            </a>)
                        ))}
                        {track.genius && track.genius.media && track.genius.media.map( platform => (
                            ( platform.provider === 'soundcloud' && <a href={platform.url} key={`${track.spotify.id}_soundcloud`}>
                                <Image className="SoundcloudTrackLogo" src="/soundcloud.png"/>
                            </a>)
                        ))}


                        <a href={`/track/${artistName} ${track.spotify.name}?spotifyId=${track.spotify.id}`} className="link-dark text-decoration-none"> {track.spotify.name}</a>

                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default topSongs;