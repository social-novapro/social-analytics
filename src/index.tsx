import functionPlot from "function-plot";
import stats from './stats.json';

let contentsBounds = document.body.getBoundingClientRect();
let width = 800;
let height = 500;
let ratio = contentsBounds.width / width;
width *= ratio;
height *= ratio;

var currentTime = getTime();



const functionPoints =[
    [1, 145],
    [2, 1],
    [3, 24],
    [4, 26],
    [5, 24],
    [6, 6],
    [7, 10],
    [8, 53],
    [9, 13],
    [10, 48],
    [11, 36],
    [12, 5],
    [13, 14],
    [14, 8]
]


const functionNumber1 = getStats();

console.log(functionPoints)

function getStats() {
    var function1: number[][] = [[0,0]];
    var highestx: number = 0;
    var lowestx: number = -1;
    var highesty: number = 0;
    var lowesty: number = -1;

    var users = 0;


    for (const stat of stats) {
        var earliestTime = 0;
    
        users++;

        function1.push([users, stat.userConnections.length])
        highestx = users

        if (highesty < stat.userConnections.length) {
            highesty = stat.userConnections.length
        };

        
        for (const connection of stat.userConnections)  {
            if (connection.timestamp == undefined || null) console.log("??")
            var time = currentTime - parseInt(connection.timestamp)
    
            if (earliestTime > parseInt(connection.timestamp)) earliestTime = Number(connection.timestamp);
        

            console.log( getParsedTime(new Date(parseInt(connection.timestamp))) )


            /*
            |   api_url
            |   timestamp
            */
    
            console.log('no')
    
        }
    }
    console.log(function1);

    
    var functionData = {
        points: function1,
        xDomain: [lowestx, highestx],
        yDomain: [lowesty, highesty],
    }

    return functionData;
}

function getParsedTime(d: Date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const year = d.getFullYear();
    const month = months[d.getMonth()];
    const days = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();

    return `${month} ${days}, ${year}: ${hours}:${minutes}`;
}

function getTime() {
    const d = new Date();
    const currentTime = d.getTime();
    return currentTime;
};


console.log(functionNumber1)
functionPlot({
    target: '#root',
    width,
    height,
    grid: true,
    xAxis: { domain: functionNumber1.xDomain },
    yAxis: {domain: functionNumber1.yDomain },

    data: [{
    points: functionNumber1.points,
    color: 'red',
    fnType: 'points',
    graphType: 'polyline',
    derivative: {
        fn: "2 * x",
        updateOnMouseMove: true
    }
    
    }]
})
/*

functionPlot({
    target: '#root',
    width,
    height,
    grid: true,
    yAxis: { domain: [-1, 9] },
    data: [{
    points: [
        [32, 1],
        [2, 1],
        [2, 2],
        [1, 2],
        [1, 1]
    ],
    color: 'green',
    fnType: 'points',
    graphType: 'polyline',
    derivative: {
        fn: "2 * x",
        updateOnMouseMove: true
    }
    
    }]
})
*/