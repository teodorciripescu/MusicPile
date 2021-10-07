import './artistDescription.css'
import Badge from 'react-bootstrap/Badge'
import TextCollapseDescription from './textCollapseDescription'
import {Image, Spinner} from "react-bootstrap";

function artistDescription({spotify, genius}){
    return (
        <div className="ArtistDescription">
            <h1>
                {spotify.name}
                <Badge className="artistDescriptionBagde" variant="success">{spotify.popularity}</Badge>
            </h1>
            <p>
                Followers(Spotify): <strong>{new Intl.NumberFormat().format(spotify.followers)}</strong>
            </p>
            {spotify && spotify.genres && spotify.genres.length > 0 &&
            <p>Genres: {spotify.genres.join(", ")}.</p>}
            {!genius &&
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
            {genius && genius.alternate_names && genius.alternate_names.length > 0 &&
            <p>Other names: {genius.alternate_names.join(", ")}.</p>}
            <div>
            {genius && genius.instagram_name &&
            <a href={`https://instagram.com/${genius.instagram_name}`}>
                <Image className="SocialMediaLogo" src="/Instagram_Glyph_Gradient_RGB.png"/>
            </a>
            }
            {genius && genius.twitter_name &&
            <a href={`https://twitter.com/${genius.twitter_name}`}>
                <Image className="SocialMediaLogo" src="/2021 Twitter logo - blue.png"/>
            </a>
            }
            {genius && genius.facebook_name &&
            <a href={`https://facebook.com/${genius.facebook_name}`}>
                <Image className="SocialMediaLogo" src="/f_logo_RGB-Blue_512.png"/>
            </a>
            }
            </div>
            <div>
            {genius && genius.description && <TextCollapseDescription description={genius.description.plain}/>}
            </div>


        </div>
    );
}

export default artistDescription;