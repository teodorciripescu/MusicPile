import './trackArtists.css'
import {Col, Row, Container} from 'react-bootstrap'
import ArtistPreview from '../ArtistPreview/artistPreview'


function trackArtists({artists}){
    return (
        <Container className="TrackArtists">
            <Row className="TrackArtistTitle">
                <h2>Artists</h2>
            </Row>
            <Row className="TrackArtistsImages">
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

export default trackArtists;