import './trackThumbnail.css'
import {Image} from "react-bootstrap";

function trackThumbnail({imageUrl}){
    return (
            <Image src={imageUrl} thumbnail className="TrackImage" />
    );
}

export default trackThumbnail;