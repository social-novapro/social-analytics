import { Routes, Route, Link } from 'react-router-dom'
import MainView from './views/mainView';
import Function1View from './graphs/Function1View';
import Function2View from './graphs/Function2View';
import Function3View from './graphs/Function3View';
import { useEffect, useState } from "react";
import stats from './stats.json'

const runtime = "prod" // "prod" || "dev" || "test"

function App() {
    useEffect(() => {
        const fetchPrices = async () => {
            var data 
            
            if (runtime === "prod") {
                const res = await fetch(`https://interact-api.novapro.net/v1/get/analyticTrend/`, { method: 'GET' })
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
            const functionNumber3 = await buildFunction3(data);
            
            const functionData = {
                functionNumber1,
                functionNumber2,
                functionNumber3,
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
                    <Link className='buttonStyled' to="/1">Connections / User</Link>
                    <Link className='buttonStyled' to="/2">Connections / Day</Link>
                    <Link className='buttonStyled' to="/3">Connections / User / Day</Link>
                    <p>Interact Analytics</p>
                </div>
            </div>
            <div className='mainBody'>
                <Routes>  
                    <Route path='/' exact={ true } element={ <MainView runtime={runtime} /> } />
                    <Route path='/1' exact={ true } element={ <Function1View chartData={chartData}/> } />
                    <Route path='/2' exact={ true } element={ <Function2View chartData={chartData}/> } />
                    <Route path='/3' exact={ true } element={ <Function3View chartData={chartData}/> } />
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
function getTimeDaysAgo(days) {
    const d = new Date();
    const currentTime = d.getTime();


    const oneDay = 86400000
    
    const amountDays = oneDay * days
    const amountDaysAgo = currentTime - amountDays
    return amountDaysAgo
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
2: bar: Connections per Day total
    x: days
    y: uses
3: line: Connections per User per Day
    x: days
    y: number of connections
4: line
    x: time
    y: number of connections
5: bar
    x: url
    y: number of connections
6: line
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

// connections per user per day | series of line graphs
async function buildFunction3(data) {
    var totalX = 0
    var totalY = 0

    var highestx = 0;
    var lowestx = -1;
    var highesty = 0;
    var lowesty = -1;

    var allUserStats = []

    // x values day (march 25)
        // y value user connections | person 1 (20 connections)
        // y value  user connections | person 2 (5 connecitons)
        // y value user connection | person 3 (24 connections)

    // x value day (march 26)
        // y value user conecntion | person 1 (2 connections)
        // y value user connection | person 2 (4 connections)
        // y value user connection | person 3 (0 connections)
        
    for (const stat of data) {
        const oneWeekAgoLayout = getTimeOneWeek()
    
        var userConnectionsPerDay = {}
        var userDays = {}
        for (const connection of stat.userConnections) {
            const day = getDayLayout(connection.timestamp)
            
    //      if (day < oneWeekAgoLayout) {
    //          console.log('to old)
    //      }
    //      else {
            userConnectionsPerDay[day] = userConnectionsPerDay[day] ? userConnectionsPerDay[day] + 1 : 1
            userDays[day] = connection.timestamp
    //      }
        }

        for (const perDay in userConnectionsPerDay) {
            allUserStats.push({x: perDay, y: userConnectionsPerDay[perDay], time: userDays[perDay], user: stat._id})
        }
    }

    var checkedUsers = {}

    for (const userStat of allUserStats) {
        if (!checkedUsers[userStat.user]) {
            checkedUsers[userStat.user] = [userStat]
        }
        else {
            checkedUsers[userStat.user].push(userStat)
        }
    }

    var dataXs = []
    var dataXsLayout = []
    var dataYs = []
    var YsLone = []

    for (var i=7; i>-1; i--) {
        const daysAgo = getTimeDaysAgo(i)
        const dateParsed = getDateMonthDay(daysAgo)

        const layoutDate = getDayLayout(daysAgo)
        dataXsLayout.push(layoutDate)

        dataXs.push(dateParsed)
    }

    var usersAmount = 0
    var dataSets = []

    for (const userStat in checkedUsers) {
        usersAmount++
        const stats = checkedUsers[userStat]

        var current = {
            fill: false,
            pointRadius: 1,
            borderColor: "rgba(255,0,0,0.5)",
            label: `User ${usersAmount}`,
            data: [ ],
        }
        var currentYs = []

        for (const day of dataXsLayout) {
            var found = false
            for (const stat of stats) {
                if (stat.x === day) {
                    totalY += stat.y
                    found = true
                    dataSets.push({user: usersAmount, days: stat.x, connections: stat.y})
                    current.data.push(stat.y)
                    currentYs.push(stat.y)
                }
            }
            if (!found) {
                dataSets.push({user: usersAmount, days: day, connections: 0})
                current.data.push(0)
            }
        }
       
        dataYs.push(current)
        YsLone.push(currentYs)
    }

    var functionData = {
        pointsXs: dataXs,
        pointsYs: dataYs,
        readyDataSets: {
            dataXs,
            YsLone,
        },
        totalX,
        totalY,
        xDomain: [lowestx, highestx],
        yDomain: [lowesty, highesty],
    }

    return functionData;
}
