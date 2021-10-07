import './footer.css'
import {Image} from "react-bootstrap";

function footer(){
    return (
        <footer className="bg-dark text-white">
            <p>FII UAIC 2021</p>
            <a href="https://github.com/teodorciripescu">
                <Image className="FooterLogo" src="/GitHub_Logo_White.png"/>
            </a>
        </footer>
    );
}

export default footer;