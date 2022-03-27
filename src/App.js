import { Routes, Route, Link } from 'react-router-dom'
import MainView from './views/mainView';
import Function1View from './graphs/Function1View';
import Function2View from './graphs/Function2View';
import { useEffect, useState } from "react";
import stats from './stats.json'

const runtime = "dev" // "prod" || "dev" || "test"

function App() {
    useEffect(() => {
        const fetchPrices = async () => {
        
            var data 
            
            if (runtime === "prod") {
                const res = await fetch(`https://interact-api.novapro.net/v1/get/analyticTrend/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "devtoken" : "33c4d102-9ece-4f8d-947a-ea1ab00e9081",
                        "apptoken" : "2d4048d3-16f2-48d4-95f4-4ab6a43aac53",
                        "accesstoken" : "489470ca-a0dc-47c8-b18d-657e7c841e53",
                        "userid" : "92316f43-b782-428d-9fe0-df960f5dd267",
                        "usertoken" : "6849268d-7819-4447-93da-767cd28e6251"
                    },
                })
                data = await res.json();
            }
            else if (runtime === "dev") {
                const res = await fetch(`http://localhost:5002/v1/get/analyticTrend/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "devtoken" : "33c4d102-9ece-4f8d-947a-ea1ab00e9081",
                        "apptoken" : "2d4048d3-16f2-48d4-95f4-4ab6a43aac53",
                        "accesstoken" : "384d90e0-f03e-408c-938a-3d87b15a18b7",
                        "userid" : "6ceae342-2ca2-48ec-8ce3-0e39caebe989",
                        "usertoken" : "9ef44898-6710-497c-a0de-9b9b4f6ad826"
                    },
                })
                data = await res.json();
            }
            else {
                data = stats;
            }
        
            const functionNumber1 = await buildFunction1(data);
            const functionNumber2 = await buildFunction2(data);
          
            const functionData = {
                functionNumber1,
                functionNumber2,
                ready: true
            }

            setChartData(functionData);
        }
        fetchPrices();
    }, []);
    
    const [chartData, setChartData] = useState({});

  	return (
        <div> 
            <div>
                <div className='nav'> 
                    <Link className='buttonStyled' to="/">Home</Link>
                    <Link className='buttonStyled' to="/1">Connections per user</Link>
                    <Link className='buttonStyled' to="/2">Connections per day</Link>
                    <p>current runtime: {runtime}</p>
                </div>
            </div>
            <div className='mainBody'>
                <div className='App'>
                    <h1>Interact Analytics</h1>
                </div>
                    
                <Routes>  

                    <Route path='/' exact={ true } element={ <MainView /> } />
                    <Route path='/1' exact={ true } element={ <Function1View chartData={chartData}/> } />
                    <Route path='/2' exact={ true } element={ <Function2View chartData={chartData}/> } />
                </Routes>
            </div>
            
        </div>
	);
}

export default App;

function getParsedTime(d) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const year = d.getFullYear();
    const month = months[d.getMonth()];
    const days = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();

    return `${month} ${days}, ${year}: ${hours}:${minutes}`;
};

function getTime() {
    const d = new Date();
    const currentTime = d.getTime();
    return currentTime;
};

function getTimeOneWeek() {
    const d = new Date();
    const currentTime = d.getTime();
    
    const dateNowLayout = getDayLayout(currentTime)
    const oneWeekAgoLayout = dateNowLayout - 7
    return oneWeekAgoLayout

};
function getDayLayout(date) {
    var d = new Date(Number(date))

    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    return `${year}${month}${day}`
} 
function getDateMonthDay(date) {
    var d = new Date(Number(date))

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const month = months[d.getMonth()];
    const day = d.getDate();

    return `${month} ${day}`;
}
/*
functions
1: bar: Connections per User
    x: user
    y: number of connections
2: bar: Connections per Day
    x: day
    y: uses
3: line
    x: time
    y: number of connections
4: bar
    x: url
    y: number of connections
5: line
    x: overtime
    y: time since last connection

*/

async function buildFunction1(data) {
    var pointsXs = [];
    var pointsYs = [];

    var functionPointsXandY =[];

    var totalX = 0
    var totalY = 0

    var highestx = 0;
    var lowestx = -1;
    var highesty = 0;
    var lowesty = -1;

    var users = 0;

    for (const stat of data) {
        users++;

        functionPointsXandY.push([users, stat.userConnections.length+1])
        pointsXs.push(`User ${users}: ${stat.userConnections.length+1}`)
        pointsYs.push(stat.userConnections.length+1)

        totalX++
        totalY += stat.userConnections.length

        highestx = users

        if (highesty < stat.userConnections.length+1) {
            highesty = stat.userConnections.length+1
        };
    }
  
    var functionData = {
        pointsXs,
        pointsYs,
        totalX,
        totalY,
        points: functionPointsXandY,
        xDomain: [lowestx, highestx],
        yDomain: [lowesty, highesty],
        ready: true
    }

    return functionData;
}

async function buildFunction2(data) {
    var pointsXs = [];
    var pointsYs = [];

    var totalX = 0
    var totalY = 0
    var functionPointsXandY =[];

    var highestx = 0;
    var lowestx = -1;
    var highesty = 0;
    var lowesty = -1;

    const dates = []

    for (const stat of data) {
        if (highesty < stat.userConnections.length) {
            highesty = stat.userConnections.length
        };

        const oneWeekAgoLayout = getTimeOneWeek()

        
        for (const connection of stat.userConnections) {
            const day = getDayLayout(connection.timestamp)

            if (day <  oneWeekAgoLayout) {
               // console.log(connection)
               // console.log('to old')
            }
            else {
                if (!dates[day]) dates[day] = {amount: 0, timeDate: getDateMonthDay(connection.timestamp)} 
                else dates[day].amount++
                totalY++
            }
        }
    }

    for (const date in dates) {
        totalX++
        pointsXs.push(`${dates[date].timeDate}: ${dates[date].amount}`)
        pointsYs.push(dates[date].amount)
        functionPointsXandY.push([dates[date].timeDate, dates[date].amount])
    }
   // console.log(dates)
        
  
    var functionData = {
        pointsXs,
        pointsYs,
        totalX,
        totalY,
        points: functionPointsXandY,
        xDomain: [lowestx, highestx],
        yDomain: [lowesty, highesty],
    }

    return functionData;
}
