import './albumThumbnail.css'
import {Image} from "react-bootstrap";

function albumThumbnail({imageUrl}){
    return (
            <Image src={imageUrl} thumbnail className="AlbumImage" />
    );
}

export default albumThumbnail;