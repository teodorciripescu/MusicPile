import './trackDescription.css'
import Badge from 'react-bootstrap/Badge'
// import TextCollapseDescription from './textCollapseDescription'
import {Image} from "react-bootstrap";

function calculateTrackLength(milliseconds) {
    var date = new Date(milliseconds);
    var m = date.getMinutes();
    var s = date.getSeconds();
    if(s < 10){
        return  m + ":0" + s;
    }
    return m + ":" + s;
}

function trackDescription({spotify, genius}) {
    return (
        <>
            {spotify && spotify.basic &&
            <div className="TrackDescription">
                <h1>
                    {spotify && spotify.basic && spotify.basic.name}
                    {spotify.basic &&
                    <Badge className="trackDescriptionBagde" variant="success">{spotify.basic.popularity}</Badge>}
                    {genius.id && genius.stats.hot &&
                    <Badge className="trackDescriptionBagde" variant="danger">Hot Track</Badge>}
                </h1>
                <h5>
                    <a style={genius && {color: genius.song_art_text_color}}
                       href={`/album/${spotify.basic.album.artists[0].name} ${spotify.basic.album.name}?spotifyId=${spotify.basic.album.id}`}>{spotify.basic.album.name}</a>
                    ({spotify.basic.album.album_type})
                </h5>
                <h5>
                    Launch Date: {new Date(spotify.basic.album.release_date).toISOString().substring(0, 10)}
                </h5>
                <h5>
                    Track number {spotify.basic.track_number}/{spotify.basic.album.total_tracks} on the album.
                </h5>
                <h5>
                    Track length: <strong>{calculateTrackLength(spotify.basic.duration_ms)}</strong>
                </h5>
                <h5>
                    {genius && genius.id &&
                    <a style={genius && {color: genius.song_art_text_color}} href={genius.url}>Lyrics</a>}
                </h5>
                <div>
                <a href={spotify.basic.external_urls.spotify}>
                    <Image className="TrackSpotifyLogo" src="/Spotify_Icon_RGB_Black.png"/>
                </a>
                {genius && genius.media && genius.media.map(platform => (
                    (platform.provider === 'youtube' && <a href={platform.url} key={`${spotify.basic.id}_youtube`}>
                        <Image className="TrackYoutubeLogo" src="/yt_icon_rgb.png"/>
                    </a>)
                ))}
                {genius && genius.media && genius.media.map(platform => (
                    (platform.provider === 'soundcloud' &&
                        <a href={platform.url} key={`${spotify.basic.id}_soundcloud`}>
                            <Image className="TrackSoundcloudLogo" src="/soundcloud.png"/>
                        </a>)
                ))}
                {genius && genius.id &&
                (<a href={genius.apple_music_player_url}>
                    <Image className="TrackAppleMusicLogo" src="/Apple_Music_Icon_RGB_sm.svg"/>
                </a>)
                }
                </div>

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

export default trackDescription;