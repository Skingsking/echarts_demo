// 统计图数据封装方法

// 获取数组中指定列
var array_column = function (array, key) {
    var data = [];
    for (let i in array) {
        data.push(array[i][key]);
    }
    return data;
};

// 获取数组中指定列的和
var array_sum = function (array, key) {
    var sum = 0;
    for (let i in array) {
        sum += array[i][key];
    }
    return sum;
};

// 饼状图
var pieChart = function (boxId, title, legend, data, radius = '45%', center = ['45%', '71%']) {
    my_chart = echarts.init(document.getElementById(boxId), 'shine');
    var option = {
        title: {
            text: title,
            // subtext: '纯属虚构',
            x: 'center',
            textStyle: {
               // fontSize: '16'
                fontWeight:'bold',
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: '30px',
            data: legend
            //array_column(ownerAgeData, 'name')
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: radius,
                center: center,
                label: {
                    // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    formatter: '{b} {d}%',
                },
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
        ],
        // color: [
        //     '#FF9C6E', '#FFC069', '#95DE64', '#5CDBD3', '#69C0FF', '#85A5FF', '#B37FEB', '#FF85C0'
        // ]
    };
    // 添加一个定时器给window注册一个onresize事件，给图表加resize（）方法  就可以实现宽高自适应了
    window.onresize = function() {
        my_chart.resize();
    };
    my_chart.setOption(option);
};

// 柱状图
var barChart = function (boxId, title, grid, xAxisData,yAxisData,color = ['#3398DB'], barWidth = '60%', dataArr) {
    my_chart = echarts.init(document.getElementById(boxId), 'shine');
    var option = {
        title: {
            text: title,
            x: 'center',
            textStyle:{
                fontWeight:'bold',
            }

        },
        grid: grid,
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis: xAxisData,
        yAxis: yAxisData,
        color: color,
        series: [{
            type: 'bar',
            barWidth: barWidth,
            data: dataArr
        }]
    };
    // 添加一个定时器给window注册一个onresize事件，给图表加resize（）方法  就可以实现宽高自适应了
    // window.onresize = function() {
    //     my_chart.resize();

        // console.log("柱状图-dataArr",dataArr);
        // dataArr.length为柱状图的条数，即数据长度。35为给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
        my_chart.resize({height: dataArr.length*35+100});
    // };
    my_chart.setOption(option);
};

//柱状图 横轴 双排
var crossBarChart=function (boxId,grid,legend,xAxisData,yAxisData,crossName_one,color_one,dataArr_one,crossName_two,color_two,dataArr_two) {
    my_chart = echarts.init(document.getElementById(boxId), 'shine');
    var option = {
        // title: {
        //     text: title,
        //     x: 'center',
        //     textStyle:{
        //         fontWeight:'bold',
        //     }
        //
        // },
        grid: grid,
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            bottom: 0,
            padding:[90,0,0,50],
            data:legend,
        },
        xAxis: xAxisData,
        yAxis: yAxisData,
        series: [
            {
                name: crossName_one,
                type: 'bar',
                // barWidth:'50%',
                //颜色
                itemStyle:{
                    normal:{
                        color:color_one,
                    }
                },
                data: dataArr_one
            },
            {
                name: crossName_two,
                type: 'bar',
                // barWidth:'50%',
                //颜色
                itemStyle:{
                    normal:{
                        color:color_two,
                    }
                },
                data: dataArr_two
            },

        ]
    };
    // 添加一个定时器给window注册一个onresize事件，给图表加resize（）方法  就可以实现宽高自适应了
    // window.onresize = function() {
    //     my_chart.resize();
    // console.log("柱状图-dataArr",dataArr);
    // dataArr.length为柱状图的条数，即数据长度。35为给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
    my_chart.resize({height: dataArr_one.length*35+260});
    my_chart.resize({height: dataArr_two.length*35+260});
    // };
    my_chart.setOption(option);
}

// 柱状图横/纵向对象数据及超出7个字换行
function axisData(data) {
        return {
            data: data,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval: 0,
                formatter: function (label) {
                    let result = '';
                    const length = label.length;
                    const lineLabelCnt = 7;
                    const rowCnt = Math.ceil(length / lineLabelCnt);
                    if (length > lineLabelCnt) {
                        for (let p = 0; p < rowCnt; p++) {
                            let tempStr = '';
                            const start = p * lineLabelCnt;
                            const end = start + lineLabelCnt;
                            if (p == rowCnt - 1) {
                                tempStr = label.substring(start, length);
                            } else {
                                tempStr = label.substring(start, end) + '\n';
                            }
                            result += tempStr;
                        }

                    } else {
                        result = label;
                    }
                    return result;
                }
            }
        }
    }
