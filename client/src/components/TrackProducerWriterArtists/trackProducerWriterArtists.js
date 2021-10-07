import './trackProducerWriterArtists.css'
import {Col, Row, Container} from 'react-bootstrap'
import ArtistPreview from '../ArtistPreview/artistPreview'

function trackProducerWriterArtists({producers, writers}){
    return (
        <Container className="TrackProducerWriterArtists">
            <Row className="TrackProducerWriterArtistsTitle">
                <h2>Producers</h2>
            </Row>
            <Row className="TrackProducerWriterArtistsImages">
                {producers.map(artist => (
                    <Col key={artist.id} xs={6} sm={6} md={3}>
                        {/*<a href={`/artist/${artist.name}?geniusId=${artist.id}`}  className="link-dark text-decoration-none">*/}
                            <ArtistPreview name={artist.name} imageUrl={artist.image_url} />
                        {/*</a>*/}
                    </Col>
                ))}

            </Row>
            <Row className="TrackProducerWriterArtistsTitle">
                <h2>Writers</h2>
            </Row>
            <Row  className="TrackProducerWriterArtistsImages">
                {writers.map(artist => (
                    <Col key={artist.id} xs={6} sm={6} md={3}>
                        {/*<a href={`/artist/${artist.name}?geniusId=${artist.id}`}  className="link-dark text-decoration-none">*/}
                            <ArtistPreview name={artist.name} imageUrl={artist.image_url} />
                        {/*</a>*/}
                    </Col>
                ))}

            </Row>
        </Container>
    );
}

export default trackProducerWriterArtists;