import './Album.css'
import { Row, Col, Container, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from 'axios';
import {useParams} from "react-router";
import {useLocation} from "react-router-dom";
import AlbumThumbnail from "../../components/AlbumThumbnail/albumThumbnail";
import AlbumDescription from "../../components/AlbumDescription/albumDescription";
import AlbumTracks from "../../components/AlbumTracks/albumTracks";
// import AlbumArtists from "../../components/AlbumArtists/albumArtists";
import TrackArtists from "../../components/TrackArtists/trackArtists";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function getAlbum(name, spotifyId, setAlbum){
    // let url = `http://${process.env.REACT_APP_DOMAIN_NAME}:3500/api/album?`;
    let url = `${process.env.REACT_APP_SPOTIFY_SERVICE}/album?`;
    if(name){
        url += `name=${name}`;
    }
    if(spotifyId){
        url += `&id=${spotifyId}`;
    }
    url += `&page=0`
    url = encodeURI(url);
    // if(geniusId){
    //     url += `&geniusId=${geniusId}`;
    // }
    return new Promise(resolve => {
        axios.get(url)
            .then(response => {
                console.log("Album Response: ", response.data.data);
                if(!response.data.data.hasOwnProperty('message'))
                    setAlbum(response.data.data);
                resolve(response.data.data);
            }).catch(error => {
            console.log(error);
        });
    });
}
function Album(){
    let query = useQuery();
    const { name } = useParams();
    const spotifyId = query.get("spotifyId");
    // const geniusId = query.get("geniusId");

    const [album, setAlbum] = useState(null);

    useEffect(()=>{
        getAlbum(name, spotifyId, setAlbum);
    },[name]);

    return (
        <Container style={{marginTop:"2em"}}>
            <div className="shadow p-3 mb-5 bg-white rounded">
            <Row>
                <Col className="AlbumThumbnailCol" sm={12} md={6} lg={4}>
                    { album &&
                    <AlbumThumbnail imageUrl={album.images[0].url}/>
                    }
                </Col>
                <Col className="AlbumInfoDescriptionCol" sm={12} md={6} lg={8}>
                    {album && <AlbumDescription album={album} />}
                </Col>
            </Row>
            <Row className="AlbumTracks">
                <Col className="AlbumTracks" sm={12} md={8} lg={6}>
                    { album &&
                    <AlbumTracks tracks={album.tracks.items} artistName={album.artists[0].name}/>
                    }
                </Col>
            </Row>
            <Row>
                {album && album.artists &&
                <TrackArtists artists={album.artists}/>
                }
            </Row>
            </div>
        </Container>
    );
}

export default Album;