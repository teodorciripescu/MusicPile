import './topAlbums.css'
import {ListGroup, Container, Image} from "react-bootstrap";

function topAlbums({topAlbumsSpotify, artistName, artistId}){
    return (
        <Container className="topAlbumsContainer">
            <h2 className="topAlbumsTitle">Top Albums</h2>
            <ListGroup variant="flush">
                {topAlbumsSpotify.map(album => (
                    <ListGroup.Item key={album.id}>
                        <a href={album.external_urls.spotify}>
                            <Image className="SpotifyTrackLogo" src="/Spotify_Icon_RGB_Black.png"/>
                        </a>
                        <a href={`/album/${artistName} ${album.name}?spotifyId=${album.id}`} className="link-dark text-decoration-none"> {album.name}</a>

                    </ListGroup.Item>
                ))}
            </ListGroup>

            <a className="btn btn-dark topAlbumsViewAllButton" href={`/artist/albums/${artistName}?spotifyId=${artistId}&page=0`}>
                View All
            </a>

        </Container>
    );
}

export default topAlbums;