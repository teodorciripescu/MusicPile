import './suggestedArtists.css'
import {Col, Row, Container} from 'react-bootstrap'
// import {Link} from 'react-router-dom'
import ArtistPreview from '../ArtistPreview/artistPreview'

function suggestedArtists({suggestedArtists}){
    return (
        <Container className="SuggestedArtists">
            <Row>
                <h2 className="suggestedArtistsTitle">Suggested Artists</h2>
            </Row>
            <Row>
                {suggestedArtists.slice(0,4).map(artist => (
                    <Col key={artist.id} xs={6} sm={6} md={3}>
                        <a href={`/artist/${artist.name}?spotifyId=${artist.id}`}  className="link-dark text-decoration-none">
                            {artist.images && artist.images.length > 1 &&
                            <ArtistPreview name={artist.name} imageUrl={artist.images[1].url} />
                            }

                        </a>
                        {/*<Link to={`/artist/${artist.name}?spotifyId=${artist.id}`}  className="link-dark text-decoration-none">*/}
                        {/*    <ArtistPreview name={artist.name} imageUrl={artist.images[1].url} />*/}
                        {/*</Link>*/}
                    </Col>
                ))}

            </Row>
        </Container>
    );
}

export default suggestedArtists;