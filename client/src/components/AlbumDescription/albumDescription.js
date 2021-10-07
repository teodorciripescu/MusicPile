import './albumDescription.css'
import Badge from 'react-bootstrap/Badge'
import {Image} from "react-bootstrap";

function albumDescription({album}) {
    return (
        <>
            {album &&
            <div className="AlbumDescription">
                <h1>
                    {album.name}
                    <Badge className="albumDescriptionBagde" variant="success">{album.popularity}</Badge>
                </h1>
                <h5>
                    <strong>{album.album_type}</strong>
                </h5>
                <h5>
                    Launch Date: <strong>{new Date(album.release_date).toISOString().substring(0, 10)}</strong>
                </h5>
                <h5>
                    Number of tracks: <strong>{album.total_tracks}</strong>
                </h5>
                {album.genres && (album.genres.length > 0) &&
                <h5>
                    {album.genres.join(', ')}
                </h5>}
                <h5>
                    Label: <strong>{album.label}</strong>
                </h5>
                <h5>
                    Copyrights: {album.copyrights.map(copyright =>{return copyright.text }).join(', ')}
                </h5>
                <a href={album.external_urls.spotify}>
                    <Image className="TrackSpotifyLogo" src="/Spotify_Icon_RGB_Black.png"/>
                </a>


                {/*<p>*/}
                {/*    Followers(Spotify): <strong>{new Intl.NumberFormat().format(spotify.followers)}</strong>*/}
                {/*</p>*/}
                {/*{spotify && spotify.genres && spotify.genres.length > 0 &&*/}
                {/*<p>Genres: {spotify.genres.join(", ")}.</p>}*/}
                {/*{!genius &&*/}
                {/*<Spinner animation="border" role="status">*/}
                {/*    <span className="sr-only">Loading...</span>*/}
                {/*</Spinner>}*/}
                {/*{genius && genius.alternate_names && genius.alternate_names.length > 0 &&*/}
                {/*<p>Other names: {genius.alternate_names.join(", ")}.</p>}*/}


            </div>
            }
        </>
    );
}

export default albumDescription;