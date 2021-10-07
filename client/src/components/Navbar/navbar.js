import 'bootstrap/dist/css/bootstrap.css';
import './navbar.css'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
// import {logDOM} from "@testing-library/react";
import {useState} from "react";
// import axios from "axios";
import { useHistory } from "react-router-dom";

// function searchEvent(e){
//     e.preventDefault();
//     console.log(e.target.searchValue.value);
//     console.log("hello there I am working");
// }
function searchArtists(queryString, setSearchInput, setSearchResult){
    setSearchInput(queryString);
    console.log(queryString);
    // let url = `http://localhost:3500/api/artist/search?name=${queryString}`;
    // axios.get(encodeURI(url))
    //     .then(response => {
    //         console.log("Search Artists Response: ", response.data.data);
    //         setSearchResult(response.data.data);
    //     }).catch(error => {console.log(error);});
}

function AppNavbar() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const history = useHistory();
    let viewSearchResults = function() {
        history.push(`/search/${searchInput}`);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/stats/top50global?date=latest" className="NavbarBrand">MusicPile</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="NavbarToggle" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto Nav">
                    {/*<Link to="/artist" className="nav-link">Home</Link>*/}
                    {/*<Link to="/top_artists" className="nav-link">Top Artists</Link>*/}
                    <Link to="/stats/top50global?date=latest" className="nav-link">Top 50 Global</Link>
                    {/*<NavDropdown title="Genres" id="basic-nav-dropdown" className="NavDropdown">*/}
                    {/*    <NavDropdown.Item href="#action/3.1">Rock</NavDropdown.Item>*/}
                    {/*    <NavDropdown.Item href="#action/3.2">Pop</NavDropdown.Item>*/}
                    {/*    <NavDropdown.Item href="#action/3.3">Jazz</NavDropdown.Item>*/}
                    {/*    <NavDropdown.Divider />*/}
                    {/*    <NavDropdown.Item href="#action/3.4">New in Town</NavDropdown.Item>*/}
                    {/*</NavDropdown>*/}
                </Nav>
                <Form className="NavbarForm" onSubmit={viewSearchResults}>
                    <FormControl id="searchValue" type="text" placeholder="Search Artist" className="FormSearchBox" onChange={(e) => searchArtists(e.target.value, setSearchInput, setSearchResult)}/>
                    <Button variant="outline-light" className="FormButton" type="submit">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AppNavbar;