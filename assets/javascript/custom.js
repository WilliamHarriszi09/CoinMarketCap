$(document).ready(() => {
    
    const month = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
    const thisDate = new Date();

    var json_array = [{
        coin_type: "BTC",
        data: [
            {
                task: 1,
                description: "Read news",
                start: "2023-4-4",
                end: "2023-7-1",
                type: 1
            }, {
                task: 2,
                description: "Check values",
                start: "2023-7-20",
                end: "2023-8-28",
                type: 0
            }
        ]
    }, {
        coin_type: "ETH",
        data: [
            {
                task: 1,
                description: "Read news",
                start: "2023-8-20",
                end: "2023-10-15",
                type: 0
            }, {
                task: 2,
                description: "Check values",
                start: "2023-11-1",
                end: "2023-12-28",
                type: 1
            }
        ]
    }, {
        coin_type: "XPR",
        data: [
            {
                task: 1,
                description: "Read news",
                start: "2023-4-4",
                end: "2023-7-1",
                type: 1
            }, {
                task: 2,
                description: "Check values",
                start: "2023-7-20",
                end: "2023-9-28",
                type: 0
            }, {
                task: 3,
                description: "Read news",
                start: "2023-10-28",
                end: "2023-11-28",
                type: 1
            }
        ]
    }, {
        coin_type: "RNB",
        data: [
            {
                task: 1,
                description: "Check values",
                start: "2022-9-20",
                end: "2023-4-15",
                type: 0
            }, {
                task: 2,
                description: "Read news",
                start: "2023-11-1",
                end: "2024-2-1",
                type: 1
            }
        ]
    }, {
        coin_type: "ADA",
        data: [
            {
                task: 1,
                description: "Read news",
                start: "2023-2-4",
                end: "2023-3-1",
                type: 1
            }, {
                task: 2,
                description: "Check values",
                start: "2023-4-28",
                end: "2023-8-28",
                type: 0
            }
        ]
    }, {
        coin_type: "MATIC",
        data: [
            {
                task: 1,
                description: "Read news",
                start: "2023-8-20",
                end: "2023-10-15",
                type: 0
            }, {
                task: 2,
                description: "Check values",
                start: "2023-12-1",
                end: "2024-1-28",
                type: 1
            }
        ]
    }]

    const d = new Date();
    let curMonth = Number(d.getMonth());
    
    let strHeader = "";
    strHeader += '<tr class="row100 head">' +
        '<th class="column100 column1" data-column="column1">Coin</th>' +
        '<th class="column100 column2" data-column="column2">Price</th>' +
        '<th class="column100 column3" data-column="column3">7d%</th>' +
        '<th class="column100 column4" data-column="column4">28d%</th>' +
        '<th class="column100 column5" data-column="column5">90d%</th>';

    for (let i = curMonth; i < curMonth + 12; i++) {
        strHeader += '<th class="column100 column' + (6+i-curMonth) + '" data-column="column' + (6+i-curMonth) + '">' + month[i > 11 ? i-12 : i] + '</th>';
    }

    strHeader += '</tr>'
    $("thead").append(strHeader);

    // Get basic json table columns from json input data
    json_array.forEach(json_ele => {
        let str = "";

        str += '<tr class="row100">';
        str += '<td class="column100 column1" data-column="column1">' + json_ele.coin_type + '</td>';

        str += '<td class="column100 column2" data-column="column2"></td>';
        str += '<td class="column100 column3" data-column="column3"></td>';
        str += '<td class="column100 column4" data-column="column4"></td>';
        str += '<td class="column100 column5" data-column="column5"></td>';

        var sNum = [], eNum = [];

        for (let k = 0; k < json_ele.data.length; k++) {
            //Get This Year : 2023
            let thisYear = thisDate.getFullYear();

            var sDate = json_ele.data[k].start.split("-");
            var eDate = json_ele.data[k].end.split("-");

            // Get start and end date's week number
            var sWeekNum = getWeekOfMonth(new Date(json_ele.data[k].start));
            var eWeekNum = getWeekOfMonth(new Date(json_ele.data[k].end));

            var sMonth, eMonth;
            // Get start and end date's months
            if (sDate[0] > thisYear) {
                if (sDate[0] == thisYear + 1) {
                    sMonth = 12 + Number(sDate[1]);
                } else 
                    sMonth = 25;
            } else if (sDate[0] == thisYear) {
                sMonth = Number(sDate[1]);
            } else {
                sMonth = 0;               
                sWeekNum = 0; 
            }
            
            
            if (eDate[0] > thisYear) {
                if (eDate[0] == thisYear + 1) {
                    eMonth = 12 + Number(eDate[1]);
                } else 
                    eMonth = 25;
            } else if (eDate[0] == thisYear) {
                eMonth = Number(eDate[1]);
            } else {
                eMonth = 0;                
                eWeekNum = 0; 
            }
            
            

            sNum.push(sMonth + sWeekNum * 0.25);
            eNum.push(eMonth + eWeekNum * 0.25);

        }

                
        
        for (let i = curMonth + 1; i < curMonth + 13; i++) {
            str += '<td class="column100 column' + (6 + i - curMonth) + '" data-column="column' + (6 + i - curMonth)  + '"><div class="td-row">';
            for (let j = 0; j < 4; j++) {

                    cNum = i + j * 0.25;

                    str += '<div class="td-md-3';
                    for (let k = 0; k < json_ele.data.length; k++) {
                        // console.log(sNum[k], cNum, eNum[k])
                        if (cNum >= sNum[k] && cNum <= eNum[k]) {
                            
                            str += ' tp-' + json_ele.data[k].type + '" title = "' + json_ele.data[k].description ;
                            
                        } 
                        
                    }
                    str += '"></div>';
                    
                
            }
            str += '</div></td>'

        }
        str += '</tr>';
        $("tbody").append(str);
    });

    // This is a function to return Number of the week.
    function getWeekOfMonth(date) {
        let adjustedDate = date.getDate();
        if (adjustedDate >= 1 && adjustedDate <= 7){
            weelNum = 0;
        } else if (adjustedDate >= 6 && adjustedDate <= 15){
            weelNum = 1;
        } else if (adjustedDate >= 16 && adjustedDate <= 23){
            weelNum = 2;
        } else if (adjustedDate >= 24 && adjustedDate <= 31){
            weelNum = 3;
        }
        return weelNum;
    }

    $("#this_year").text("Year " + thisDate.getFullYear()).css('margin-bottom', '20px');

    $("#refresh_btn").click(() => getCoinData());
    
    // This is a function that get json coinmarketcap data and fill colors to table.
    function getCoinData() {
        fetch("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=btc,eth&CMC_PRO_API_KEY=9b28a4a7-51c9-42bc-8949-78dca45e4609")
        .then(res => {
            return res.json();
        })
        .then(function(res2) {
            
            var coinmarket_data = res2.data;
            // }
            for (let i = 0; i < json_array.length; i++) {
                if (coinmarket_data[json_array[i].coin_type] === undefined) {
                    break;
                }

                $("tbody .row100:eq('" + i + "') .column2").text(setDotUnderTwo(coinmarket_data[json_array[i].coin_type][0].quote.USD.price));
                
                if (coinmarket_data[json_array[i].coin_type][0].quote.USD.percent_change_7d > 0)
                    $("tbody .row100:eq('" + i + "') .column3").addClass('percent-up');
                else 
                    $("tbody .row100:eq('" + i + "') .column3").addClass('percent-down');

                if (coinmarket_data[json_array[i].coin_type][0].quote.USD.percent_change_30d > 0)
                    $("tbody .row100:eq('" + i + "') .column4").addClass('percent-up');
                else 
                    $("tbody .row100:eq('" + i + "') .column4").addClass('percent-down');

                if (coinmarket_data[json_array[i].coin_type][0].quote.USD.percent_change_90d > 0)
                    $("tbody .row100:eq('" + i + "') .column5").addClass('percent-up');
                else 
                    $("tbody .row100:eq('" + i + "') .column5").addClass('percent-down');
                
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    // This is a function that seperate number bellow dot except 2 numbers.
    function setDotUnderTwo(num) {
        var strNum = num.toString().split(".");
        return strNum[0] + "." + strNum[1].slice(0,2);
    }

});


