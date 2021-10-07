import './trackAudioFeatures.css'
import {Row, Container, Table} from 'react-bootstrap'

function trackAudioFeatures({audioFeatures}){
    return (
        <Container className="TrackAudioFeaturesArtists">
            {/*<Row>*/}
            {/*    <h2>Audio Features</h2>*/}
            {/*</Row>*/}
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Audio Feature</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Acousticness</td>
                            <td>{(audioFeatures.acousticness * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <td>Danceability</td>
                            <td>{(audioFeatures.danceability * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <td>Energy</td>
                            <td>{(audioFeatures.energy * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <td>Instrumentalness</td>
                            <td>{(audioFeatures.instrumentalness * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <td>Liveness</td>
                            <td>{(audioFeatures.liveness * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <td>Speechiness</td>
                            <td>{(audioFeatures.speechiness * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <td>Valence</td>
                            <td>{(audioFeatures.valence * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <td>Loudness</td>
                            <td>{audioFeatures.loudness}</td>
                        </tr>
                        <tr>
                            <td>Tempo</td>
                            <td>{audioFeatures.tempo}</td>
                        </tr>
                        {/*<tr>*/}
                        {/*    <td>Key</td>*/}
                        {/*    <td>{audioFeatures.key}</td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*    <td>Mode</td>*/}
                        {/*    <td>{audioFeatures.mode}</td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*    <td>Time Signature</td>*/}
                        {/*    <td>{audioFeatures.time_signature}</td>*/}
                        {/*</tr>*/}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}

export default trackAudioFeatures;