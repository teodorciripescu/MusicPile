import './albumTracks.css'
import {ListGroup} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

function calculateTrackLength(milliseconds) {
    var date = new Date(milliseconds);
    var m = date.getMinutes();
    var s = date.getSeconds();
    if(s < 10){
        return  m + ":0" + s;
    }
    return m + ":" + s;
}

function albumTracks({tracks, artistName}){
    return (
        <>
            <ListGroup variant="flush">
                {tracks.map(track => (
                    <ListGroup.Item key={track.id}>
                        <h5>
                        {track.track_number}.
                        <a href={`/track/${artistName} ${track.name}?spotifyId=${track.id}`} className="link-dark text-decoration-none">{track.name}</a>
                            <Badge className="artistDescriptionBagde" variant="secondary">{calculateTrackLength(track.duration_ms)}</Badge>
                        {track.explicit && <Badge className="artistDescriptionBagde" variant="warning">Explicit</Badge>}
                        </h5>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}

export default albumTracks;