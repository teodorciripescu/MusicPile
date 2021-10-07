import './SearchArtists.css'
import {Row, Col, Container} from "react-bootstrap";
import axios from "axios";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import SearchArtistsList from "../../components/SearchArtistsList/searchArtistsList";

function getSearchArtists(name, setSearchArtists){
    // let url = `http://${process.env.REACT_APP_DOMAIN_NAME}:3500/api/artist/search?name=${name}`;
    let url = `${process.env.REACT_APP_SPOTIFY_SERVICE}/artist/search?name=${name}`;
    return new Promise(resolve => {
        axios.get(encodeURI(url))
            .then(response => {
                console.log("Search Artists Response: ", response.data.data)
                setSearchArtists(response.data.data);
                resolve(response.data.data);
            }).catch(error => {
            console.log(error);
        });
    });
}

function SearchArtists(){
    const { name } = useParams();

    const [searchArtists, setSearchArtists] = useState(null);
    const [searchArtistsIsPending, setSearchArtistsIsPending] = useState(true);

    useEffect(()=>{
        getSearchArtists(name, setSearchArtists).then(artists => {
            setSearchArtistsIsPending(false);
        });
    },[name]);

    return (
        <Container>
            <Row >
                <Col className="SearchArtistsTitle">
                    <h1>{`Search results for '${name}'`}</h1>
                    {searchArtistsIsPending && <LoadingSpinner/>}
                </Col>
            </Row>
            <Row >
                <Col>
                    {searchArtists && <SearchArtistsList artists={searchArtists.artists}/>}
                </Col>
            </Row>
        </Container>
    );
}

export default SearchArtists;