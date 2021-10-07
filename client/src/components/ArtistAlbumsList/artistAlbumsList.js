import './artistAlbumsList.css'
import {Image, ListGroup} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";



function artistAlbumsList({albums, artistName}){
    return (
            <ListGroup variant="flush">
                {albums.map(album => (
                    <ListGroup.Item key={album.id}>
                        <h5>
                            <Image style={{height:"2em"}} src={album.images[2].url} rounded className="ArtistAlbumsImage" />
                        <a href={`/album/${artistName} ${album.name}?spotifyId=${album.id}`} className="link-dark text-decoration-none">{album.name}</a>
                            <Badge className="artistDescriptionBagde" variant="secondary">{album.total_tracks} Tracks</Badge>
                        <Badge className="artistDescriptionBagde" variant="warning">{album.album_type}</Badge>
                        </h5>
                    </ListGroup.Item>
                ))}
            </ListGroup>
    );
}

export default artistAlbumsList;