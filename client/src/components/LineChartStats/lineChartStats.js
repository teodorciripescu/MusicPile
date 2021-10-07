import './lineChartStats.css'
import { LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

function LineChartStats({data, xField, yField}) {
    const [stats, setStats] = useState(null);
    useEffect(()=>{
        data.forEach(v => {delete v.genres; v.date = v.date.substr(0,10)});
        setStats(data);
        // console.log(data);
    },[stats]);
    return (
        <Container>
            <Row >
                <Col className="LineChartTitle">
                    {/*<h2>{`Statistics`}</h2>*/}
                </Col>
            </Row>
            <Row>
                <Col className="LineChartTitle">
                    <h2>Popularity</h2>
                </Col>
                    <div className="LineChartWrapper">
                        <ResponsiveContainer  width="80%" aspect={3}>
                            <LineChart   data={stats}>
                                <Line type="monotone" dataKey="popularity" stroke="#8884d8"/>
                                <CartesianGrid stroke="#ccc"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
            </Row>
            <Row>
                <Col className="LineChartTitle">
                    <h2>Followers</h2>
                </Col>
                    <div className="LineChartWrapper">
                        <ResponsiveContainer width="80%" aspect={3}>
                            <LineChart className="LineChartStyle" data={stats} margin={{ top: 0, right: 0, bottom: 0, left: 28 }}>
                                <Line type="monotone" dataKey="followers" stroke="#8884d8"/>
                                <CartesianGrid stroke="#ccc"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
            </Row>
        </Container>
    );
}

export default LineChartStats;