import './albumArtists.css'
import {Col, Row, Container} from 'react-bootstrap'
import ArtistPreview from '../ArtistPreview/artistPreview'


function albumArtists({artists}){
    return (
        <Container className="AlbumArtists">
            <Row className="AlbumArtistTitle">
                <h2>Artists</h2>
            </Row>
            <Row className="AlbumArtistsImages">
                {artists.map(artist => (
                    <Col key={artist.id} xs={6} sm={6} md={3}>
                        <a href={`/artist/${artist.name}?spotifyId=${artist.id}`}  className="link-dark text-decoration-none">
                            <ArtistPreview name={artist.name} imageUrl={artist.image} popularity={artist.popularity} />
                        </a>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default albumArtists;