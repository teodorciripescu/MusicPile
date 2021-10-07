import './Top50Global.css'
import {Row, Col, Container} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Top50GlobalList from "../../components/Top50GlobalList/top50GlobalList";



function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function dateChanged(date, setDate){
    console.log(date);
    setDate(date);
}

function getTop50Global(date, setTop50Global){
    // let url = `http://${process.env.REACT_APP_DOMAIN_NAME}:3500/api/stats/top50global?date=${date}`;
    let url = `${process.env.REACT_APP_SPOTIFY_SERVICE}/stats/top50global?date=${date}`;
    console.log(process.env.DOMAIN_NAME);
    return new Promise(resolve => {
        axios.get(encodeURI(url))
            .then(response => {
                console.log("Top 50 Global Response: ", response.data.data)
                setTop50Global(response.data.data);
                resolve(response.data.data);
            }).catch(error => {
            console.log(error);
        });
    });
}

function Top50Global(){
    let query = useQuery();
    const inputDate = query.get("date");

    const [top50Global, setTop50Global] = useState(null);
    const [top50GlobalIsPending, setTop50GlobalIsPending] = useState(true);
    const [date, setDate] = useState(inputDate);

    useEffect(()=>{
        getTop50Global(date, setTop50Global).then(artists => {
            setTop50GlobalIsPending(false);
        });
    },[date]);

    return (
        <Container>
            <Row >
                <Col className="Top50GlobalTitle">
                    {top50Global && <h1>{`Top 50 Tracks Global on '${top50Global.date.substr(0, 10)}'`}</h1>}
                    {top50GlobalIsPending && <LoadingSpinner/>}
                </Col>
            </Row>

            {top50Global &&
            <Row className="Top50GlobalDateSelector">
                <Col xs={7} sm={6} md={5} lg={3}>
                    <div className="form-group">
                        <input className="form-control" type="date"
                               min="2021-03-24" max={new Date().toISOString().split('T')[0]}
                               defaultValue={top50Global.date.substr(0,10)}
                               onSelect={(e) => dateChanged(e.target.value, setDate)} id="example-date-input"/>
                    </div>
                </Col>
            </Row>}

            <Row className="Top50GlobalContent">
                <Col  sm={12} md={8} lg={8}>
                    {top50Global &&
                        <Top50GlobalList tracks={top50Global.tracks}/>
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default Top50Global;