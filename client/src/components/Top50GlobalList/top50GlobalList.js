import './top50GlobalList.css'
import {ListGroup} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

function top50GlobalList({tracks}){
    return (
        <div className="shadow p-3 mb-5 bg-white rounded">
            <ListGroup variant="flush">
                {tracks.map((track, index) => (
                    <ListGroup.Item key={track.id}>
                        <h5>
                            <span className="TitleItem">{index + 1}.</span>
                            <strong>
                            <a href={`/track/${track.artists[0].name} ${track.name}?spotifyId=${track.id}`} className="TitleItem link-dark text-decoration-none">{track.name}</a>
                            </strong>
                            <span className="TitleItem">-</span>
                            <a href={`/artist/${track.artists[0].name}?spotifyId=${track.artists[0].id}`} className=" TitleItem link-dark text-decoration-none">{track.artists[0].name}</a>
                            <Badge className="artistDescriptionBagde" variant="warning">{track.release_date}</Badge>
                            <Badge className="artistDescriptionBagde" variant="success">{track.popularity}</Badge>

                        </h5>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default top50GlobalList;