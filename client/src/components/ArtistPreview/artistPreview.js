import './artistPreview.css'
import ArtistThumbnail from '../ArtistThumbnail/artistThumbnail'
import Badge from "react-bootstrap/Badge";
function artistPreview({name, imageUrl, popularity}){
    return (
        <div className="ArtistPreview">
            <ArtistThumbnail imageUrl={imageUrl}/>
            {popularity ? <h3>{name}<Badge className="artistDescriptionBagde" variant="success">{popularity}</Badge></h3> : <h3>{name}</h3>}
        </div>
    );
}

export default artistPreview;