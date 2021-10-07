// import logo from '../../logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Artist from '../Artist/Artist'
import ArtistAlbums from '../ArtistAlbums/ArtistAlbums'
import Track from '../Track/Track'
import Album from '../Album/Album'
import TopArtists from '../TopArtists/TopArtists'
// import Home from '../Home/Home'
import SearchArtists from '../SearchArtists/SearchArtists'
import Top50Global from '../Top50Global/Top50Global'

function App() {
  return (
      <Router>
            <div className="App d-flex flex-column min-vh-100">
                <div className="flex-fill">
                    <Header/>
                        <Switch>
                            <Route exact path="/">
                                <Redirect
                                    to={{
                                        pathname: "/stats/top50global",
                                        search: "?date=latest"
                                    }}
                                />
                            </Route>
                            <Route exact path="/artist/:name">
                                <Artist/>
                            </Route>
                            <Route exact path="/artist/albums/:name">
                                <ArtistAlbums/>
                            </Route>
                            <Route exact path="/track/:name">
                                <Track/>
                            </Route>
                            <Route exact path="/album/:name">
                                <Album/>
                            </Route>
                            <Route exact path="/top_artists">
                                <TopArtists/>
                            </Route>
                            <Route exact path="/search/:name">
                                <SearchArtists/>
                            </Route>
                            <Route exact path="/stats/top50global">
                                <Top50Global/>
                            </Route>
                        </Switch>
                </div>
                <Footer />
            </div>
      </Router>
  );
}

export default App;
