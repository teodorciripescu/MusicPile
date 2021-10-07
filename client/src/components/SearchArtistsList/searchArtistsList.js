import './searchArtistsList.css'
import {Col, Row, Container} from 'react-bootstrap'
import ArtistPreview from '../ArtistPreview/artistPreview'


function searchArtistsList({artists}){
    return (
        <Container className="SearchArtistsList">
            <Row className="SearchArtistsImages">
                {artists.map(artist => (
                    <>
                    {artist.images && artist.images[0] &&
                    <Col key={artist.id} xs={6} sm={6} md={3}>
                        <a href={`/artist/${artist.name}?spotifyId=${artist.id}`}  className="link-dark text-decoration-none">
                            <ArtistPreview name={artist.name} imageUrl={artist.images[0].url} popularity={artist.popularity} />
                        </a>
                    </Col>}
                    </>
                ))}
            </Row>
        </Container>
    );
}

export default searchArtistsList;