import './artistThumbnail.css'
import {Image} from "react-bootstrap";

function artistThumbnail({imageUrl}){
    return (
            <Image src={imageUrl} thumbnail className="ArtistImage" />
    );
}

export default artistThumbnail;