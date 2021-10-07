import './ArtistAlbums.css'
import { Row, Col, Container, Pagination} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from 'axios';
import {useParams} from "react-router";
import {useLocation} from "react-router-dom";
import ArtistAlbumsList from "../../components/ArtistAlbumsList/artistAlbumsList"

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function getArtistAlbums(name, spotifyId, page, setArtistAlbums){
    // let url = `http://${process.env.REACT_APP_DOMAIN_NAME}:3500/api/artist/albums?`;
    let url = `${process.env.REACT_APP_SPOTIFY_SERVICE}/artist/albums?`;
    if(name){
        url += `name=${name}`;
    }
    if(spotifyId){
        url += `&id=${spotifyId}`;
    }
    url += `&page=${page}`;
    return new Promise(resolve => {
        axios.get(url)
            .then(response => {
                console.log("Artist Albums Response: ", response.data.data)
                setArtistAlbums(response.data.data);
                resolve(response.data.data);
            }).catch(error => {
            console.log(error);
        });
    });
}
function ArtistAlbums(){
    let query = useQuery();
    const { name } = useParams();
    const spotifyId = query.get("spotifyId");
    const page = query.get("page");
    console.log('page: ' + page);

    const [artistAlbums, setArtistAlbums] = useState(null);

    useEffect(()=>{
        getArtistAlbums(name, spotifyId, page, setArtistAlbums);
    },[name]);

    return (
        <>
        {artistAlbums &&
        <Container style={{marginTop:"2em"}}>
            <div className="shadow p-3 mb-5 bg-white rounded">
            <Row >
                <h1 className="ArtistAlbumsTitle d-flex justify-content-center"><a className="link-dark" href={`/artist/${name}?spotifyId=${spotifyId}`}>{name}</a>'s Albums</h1>
            </Row>
            {artistAlbums.albums &&
            <Row className="ArtistAlbumsListContainer">
                <Col className="ArtistAlbumsListContainer" sm={12} md={8} lg={8}>
                    <ArtistAlbumsList albums={artistAlbums.albums} artistName={name}/>
                </Col>
            </Row>
            }
            <Row>
                <Pagination className="AlbumsNavigation justify-content-center">
                    <Pagination.Item  href={`/artist/albums/${name}?spotifyId=${spotifyId}&page=${parseInt(page) - 1}`}
                                      disabled={page === '0'}>
                        Previous
                    </Pagination.Item>
                    <Pagination.Item  active="true">
                        {parseInt(page) + 1}
                    </Pagination.Item>
                    <Pagination.Item href={`/artist/albums/${name}?spotifyId=${spotifyId}&page=${parseInt(page) + 1}`}
                                     disabled={artistAlbums.albums.length < 20}>
                        Next
                    </Pagination.Item>
                </Pagination>
            </Row>
            </div>
        </Container>
        }
        </>
    );
}

export default ArtistAlbums;