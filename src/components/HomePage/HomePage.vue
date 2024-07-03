<template>
  <div class="home-page-container" id="home">
    <div class="header">
      <div class="header_bg">
        <h1>可视化大屏</h1>
        <div class="time">当前时间：2020年3月17-0时54分14秒</div>
      </div>
      <div class="body">
        <div class="column">
          <div class="panel">
            <div
              class="single"
              ref="mychart1"
              id="a"
              style="width: 300px; height: 250px"
            ></div>
          </div>
          <div class="panel">
            <div class="single" ref="mychart3"></div>
          </div>
        </div>
        <div class="column center">
          <div class="header">
            <div class="number">
              <ul>
                <li>1024</li>
                <li>372</li>
              </ul>
            </div>
            <div class="title">
              <div class="title1">全村总人数</div>
              <div class="title1">外出总人数</div>
            </div>
          </div>
          <div class="body">
            <div class="chart" ref="mychart5"></div>
            <div class="map1"></div>
            <div class="map2"></div>
            <div class="map3"></div>
          </div>
        </div>
        <div class="column">
          <div class="panel">
            <div class="single" ref="mychart2"></div>
          </div>
          <div class="panel">
            <div class="single" ref="mychart4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";

import { onMounted, ref } from "vue";
import { getEvent } from "../../api/event";
// import "echarts/node_modules/china";
const mychart1 = ref(null);
const mychart2 = ref(null);
const mychart3 = ref(null);
const mychart4 = ref(null);
const mychart5 = ref(null);
const event1 = ref(null);
const event2 = ref(null);
const event3 = ref(null);
onMounted(async () => {
  const result = await getEvent();
  event1.value = result.data.filter((item) => item.type === 1).length;
  event2.value = result.data.filter((item) => item.type === 2).length;
  event3.value = result.data.filter((item) => item.type === 3).length;
  var t = null;
  t = setTimeout(time, 1000); //開始运行
  function time() {
    clearTimeout(t); //清除定时器
    let dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth() + 1;
    var day = dt.getDate();
    var h = dt.getHours(); //获取时
    var m = dt.getMinutes(); //获取分
    var s = dt.getSeconds(); //获取秒
    document.querySelector(".time").innerHTML =
      "当前时间：" +
      y +
      "年" +
      mt +
      "月" +
      day +
      "-" +
      h +
      "时" +
      m +
      "分" +
      s +
      "秒";
    t = setTimeout(time, 1000); //设定定时器，循环运行
  }

  //左上角图表
  var myChart1 = echarts.init(mychart1.value);
  myChart1.setOption({
    color: "#2f89cf",
    title: {
      text: "事件类型及数量",
      textStyle: {
        color: "white", // 字体颜色为红色
        fontWeight: "bold", // 字体加粗
        fontFamily: "sans-serif", // 字体为无衬线字体
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["种植情况", "道路情况", "新鲜事情"],
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          show: "flase",
        },
        axisLabel: {
          color: "#FFFFFF", // 将 x 轴的文字颜色设置为白色
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        barWidth: "60%",
        data: [event1.value, event2.value, event3.value],
        itemStyle: {
          barBorderRadius: 5,
          borderWidth: 0.4,
          borderType: "solid",
          borderColor: "#73c0de",
          shadowColor: "#5470c6",
          shadowBlur: 3,
        },
      },
    ],
  });

  //右上角图表
  var myChart2 = echarts.init(mychart2.value);
  myChart2.setOption({
    title: {
      text: "全村人口结构",
      textStyle: {
        color: "white", // 字体颜色为红色
        fontWeight: "bold", // 字体加粗
        fontFamily: "sans-serif", // 字体为无衬线字体
      },
    },
    series: [
      {
        type: "pie",
        data: [
          {
            value: 324,
            name: "老年人",
          },
          {
            value: 641,
            name: "中年人",
          },
          {
            value: 421,
            name: "青少年",
          },
        ],
        roseType: "area",
      },
    ],
  });

  var myChart3 = echarts.init(mychart3.value);
  myChart3.setOption({
    title: {
      text: "历年粮食收成情况",
      textStyle: {
        color: "white", // 字体颜色为红色
        fontWeight: "bold", // 字体加粗
        fontFamily: "sans-serif", // 字体为无衬线字体
      },
    },
    color: "white",
    xAxis: {
      data: ["2021", "2022", "2023", "2024"],
      axisLabel: {
        color: "#FFFFFF", // 将 x 轴的文字颜色设置为白色
      },
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 23, 19],
        type: "line",
        lineStyle: {
          normal: {
            color: "lightgreen",
            width: 4,
            type: "dashed",
          },
        },
      },
    ],
  });

  var myChart4 = echarts.init(mychart4.value);
  myChart4.setOption({
    dataset: {
      source: [
        ["score", "amount", "product"],
        [150, 563, "拖拉机"],
        [100, 103, "自动打药机"],
        [10, 31, "大型收割机"],
        [300, 321, "除草机"],
      ],
    },
    grid: { containLabel: true },
    xAxis: { name: "amount" },
    yAxis: {
      type: "category",
      axisLabel: {
        color: "#FFFFFF", // 将 x 轴的文字颜色设置为白色
      },
    },
    visualMap: {
      orient: "horizontal",
      text: ["High Score", "Low Score"],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ["#65B581", "#FFCE34", "#FD665F"],
      },
    },
    series: [
      {
        type: "bar",
        encode: {
          // Map the "amount" column to X axis.
          x: "amount",
          // Map the "product" column to Y axis
          y: "product",
        },
      },
    ],
  });
  // 1. 实例化对象
  var myChart5 = echarts.init(mychart5.value);
  // 2. 指定配置和数据
  // 2. 指定配置和数据
  var geoCoordMap = {
    上海: [121.4648, 31.2891],
    东莞: [113.8953, 22.901],
    东营: [118.7073, 37.5513],
    中山: [113.4229, 22.478],
    临汾: [111.4783, 36.1615],
    临沂: [118.3118, 35.2936],
    丹东: [124.541, 40.4242],
    丽水: [119.5642, 28.1854],
    乌鲁木齐: [87.9236, 43.5883],
    佛山: [112.8955, 23.1097],
    保定: [115.0488, 39.0948],
    兰州: [103.5901, 36.3043],
    包头: [110.3467, 41.4899],
    北京: [116.4551, 40.2539],
    北海: [109.314, 21.6211],
    南京: [118.8062, 31.9208],
    南宁: [108.479, 23.1152],
    南昌: [116.0046, 28.6633],
    南通: [121.1023, 32.1625],
    厦门: [118.1689, 24.6478],
    台州: [121.1353, 28.6688],
    合肥: [117.29, 32.0581],
    呼和浩特: [111.4124, 40.4901],
    咸阳: [108.4131, 34.8706],
    哈尔滨: [127.9688, 45.368],
    唐山: [118.4766, 39.6826],
    嘉兴: [120.9155, 30.6354],
    大同: [113.7854, 39.8035],
    大连: [122.2229, 39.4409],
    天津: [117.4219, 39.4189],
    太原: [112.3352, 37.9413],
    威海: [121.9482, 37.1393],
    宁波: [121.5967, 29.6466],
    宝鸡: [107.1826, 34.3433],
    宿迁: [118.5535, 33.7775],
    常州: [119.4543, 31.5582],
    广州: [113.5107, 23.2196],
    廊坊: [116.521, 39.0509],
    延安: [109.1052, 36.4252],
    张家口: [115.1477, 40.8527],
    徐州: [117.5208, 34.3268],
    德州: [116.6858, 37.2107],
    惠州: [114.6204, 23.1647],
    成都: [103.9526, 30.7617],
    扬州: [119.4653, 32.8162],
    承德: [117.5757, 41.4075],
    拉萨: [91.1865, 30.1465],
    无锡: [120.3442, 31.5527],
    日照: [119.2786, 35.5023],
    昆明: [102.9199, 25.4663],
    杭州: [119.5313, 29.8773],
    枣庄: [117.323, 34.8926],
    柳州: [109.3799, 24.9774],
    株洲: [113.5327, 27.0319],
    武汉: [114.3896, 30.6628],
    汕头: [117.1692, 23.3405],
    江门: [112.6318, 22.1484],
    沈阳: [123.1238, 42.1216],
    沧州: [116.8286, 38.2104],
    河源: [114.917, 23.9722],
    泉州: [118.3228, 25.1147],
    泰安: [117.0264, 36.0516],
    泰州: [120.0586, 32.5525],
    济南: [117.1582, 36.8701],
    济宁: [116.8286, 35.3375],
    海口: [110.3893, 19.8516],
    淄博: [118.0371, 36.6064],
    淮安: [118.927, 33.4039],
    深圳: [114.5435, 22.5439],
    清远: [112.9175, 24.3292],
    温州: [120.498, 27.8119],
    渭南: [109.7864, 35.0299],
    湖州: [119.8608, 30.7782],
    湘潭: [112.5439, 27.7075],
    滨州: [117.8174, 37.4963],
    潍坊: [119.0918, 36.524],
    烟台: [120.7397, 37.5128],
    玉溪: [101.9312, 23.8898],
    珠海: [113.7305, 22.1155],
    盐城: [120.2234, 33.5577],
    盘锦: [121.9482, 41.0449],
    石家庄: [114.4995, 38.1006],
    福州: [119.4543, 25.9222],
    秦皇岛: [119.2126, 40.0232],
    绍兴: [120.564, 29.7565],
    聊城: [115.9167, 36.4032],
    肇庆: [112.1265, 23.5822],
    舟山: [122.2559, 30.2234],
    苏州: [120.6519, 31.3989],
    莱芜: [117.6526, 36.2714],
    菏泽: [115.6201, 35.2057],
    营口: [122.4316, 40.4297],
    葫芦岛: [120.1575, 40.578],
    衡水: [115.8838, 37.7161],
    衢州: [118.6853, 28.8666],
    西宁: [101.4038, 36.8207],
    西安: [109.1162, 34.2004],
    贵阳: [106.6992, 26.7682],
    连云港: [119.1248, 34.552],
    邢台: [114.8071, 37.2821],
    邯郸: [114.4775, 36.535],
    郑州: [113.4668, 34.6234],
    鄂尔多斯: [108.9734, 39.2487],
    重庆: [107.7539, 30.1904],
    金华: [120.0037, 29.1028],
    铜川: [109.0393, 35.1947],
    银川: [106.3586, 38.1775],
    镇江: [119.4763, 31.9702],
    长春: [125.8154, 44.2584],
    长沙: [113.0823, 28.2568],
    长治: [112.8625, 36.4746],
    阳泉: [113.4778, 38.0951],
    青岛: [120.4651, 36.3373],
    韶关: [113.7964, 24.7028],
  };

  var XAData = [
    [{ name: "西安" }, { name: "北京", value: 100 }],
    [{ name: "西安" }, { name: "上海", value: 100 }],
    [{ name: "西安" }, { name: "广州", value: 100 }],
    [{ name: "西安" }, { name: "西宁", value: 100 }],
    [{ name: "西安" }, { name: "银川", value: 100 }],
  ];

  var XNData = [
    [{ name: "西宁" }, { name: "北京", value: 100 }],
    [{ name: "西宁" }, { name: "上海", value: 100 }],
    [{ name: "西宁" }, { name: "广州", value: 100 }],
    [{ name: "西宁" }, { name: "西安", value: 100 }],
    [{ name: "西宁" }, { name: "银川", value: 100 }],
  ];

  var YCData = [
    [{ name: "银川" }, { name: "北京", value: 100 }],
    [{ name: "银川" }, { name: "广州", value: 100 }],
    [{ name: "银川" }, { name: "上海", value: 100 }],
    [{ name: "银川" }, { name: "西安", value: 100 }],
    [{ name: "银川" }, { name: "西宁", value: 100 }],
  ];

  var planePath =
    "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
  //var planePath = 'arrow';
  var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];

      var fromCoord = geoCoordMap[dataItem[0].name];
      var toCoord = geoCoordMap[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord],
          value: dataItem[1].value,
        });
      }
    }
    return res;
  };

  var color = ["#a6c84c", "#ffa022", "#46bee9"]; //航线的颜色
  var series = [];
  [
    ["西安", XAData],
    ["西宁", XNData],
    ["银川", YCData],
  ].forEach(function (item, i) {
    series.push(
      {
        name: item[0] + " Top3",
        type: "lines",
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: "red", //arrow箭头的颜色
          symbolSize: 3,
        },
        lineStyle: {
          normal: {
            color: color[i],
            width: 0,
            curveness: 0.2,
          },
        },
        data: convertData(item[1]),
      },
      {
        name: item[0] + " Top3",
        type: "lines",
        zlevel: 2,
        symbol: ["none", "arrow"],
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 15,
        },
        lineStyle: {
          normal: {
            color: color[i],
            width: 1,
            opacity: 0.6,
            curveness: 0.2,
          },
        },
        data: convertData(item[1]),
      },
      {
        name: item[0] + " Top3",
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          brushType: "stroke",
        },
        label: {
          normal: {
            show: true,
            position: "right",
            formatter: "{b}",
          },
        },
        symbolSize: function (val) {
          return val[2] / 8;
        },
        itemStyle: {
          normal: {
            color: color[i],
          },
          emphasis: {
            areaColor: "#2B91B7",
          },
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
          };
        }),
      }
    );
  });
  var option = {
    backgroundColor: "#000",
    title: {
      text: "模拟航线",
      subtext: "数据纯属虚构",
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: function (params, ticket, callback) {
        if (params.seriesType == "effectScatter") {
          return "线路：" + params.data.name + "" + params.data.value[2];
        } else if (params.seriesType == "lines") {
          return (
            params.data.fromName +
            ">" +
            params.data.toName +
            "<br />" +
            params.data.value
          );
        } else {
          return params.name;
        }
      },
    },
    legend: {
      orient: "vertical",
      top: "bottom",
      left: "right",
      data: ["西安 Top3", "西宁 Top3", "银川 Top3"],
      textStyle: {
        color: "#fff",
      },
      selectedMode: "multiple",
    },
    geo: {
      map: "china",
      label: {
        emphasis: {
          show: true,
          color: "#fff",
        },
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: "#00186E",
          borderColor: "#195BB9",
          borderWidth: 1,
        },
        emphasis: {
          areaColor: "#2B91B7",
        },
      },
    },
    series: series,
  };
  myChart5.setOption(option);
});
</script>

<style lang="scss" scoped>
.home-page-container {
  background-image: url("@/assets/images/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  .header {
    .header_bg {
      display: flex;
      position: relative;
      height: 60px;
      width: 100%;
      background-image: url("@/assets/images/head_bg.png");
      background-size: 100% 100%;
      justify-content: center;
      align-items: center;
      h1 {
        position: relative;
        top: -5px;
        color: white;
        font-size: 25px;
      }
      .time {
        position: absolute;
        right: 10px;
        top: 9px;
        color: white;
      }
    }
  }
  .body {
    display: flex;
    box-sizing: border-box;
    padding: 20px;
    .column {
      flex: 3;
      color: white;
      &:nth-child(2) {
        flex: 5;
      }
      .panel {
        position: relative;
        box-sizing: border-box;
        height: 260px;
        border: 1px solid rgba(25, 186, 139, 0.17);
        background: rgba(255, 255, 255, 0.04) url("@/assets/images/line(1).png");
        padding: 5px 10px;
        margin-bottom: 20px;
        &::before {
          content: " ";
          width: 15px;
          height: 15px;
          position: absolute;
          border-left: 2px solid #02a6b5;
          border-top: 2px solid #02a6b5;
          left: 0;
          top: 0;
        }
        &::after {
          content: " ";
          width: 15px;
          height: 15px;
          position: absolute;
          border-right: 2px solid #02a6b5;
          border-top: 2px solid #02a6b5;
          right: 0;
          top: 0;
        }
        .single {
          width: 100%;
          height: 100%;
          position: absolute;
          bottom: 0;
          left: 0;

          &::before {
            content: " ";
            width: 15px;
            height: 15px;
            position: absolute;
            border-left: 2px solid #02a6b5;
            border-bottom: 2px solid #02a6b5;
            left: 0;
            bottom: 0;
          }
          &::after {
            content: " ";
            width: 15px;
            height: 15px;
            position: absolute;
            border-right: 2px solid #02a6b5;
            border-bottom: 2px solid #02a6b5;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
    .center {
      padding: 0 10px;
      .header {
        height: 100px;
        width: 100%;
        background-color: rgba(101, 132, 226, 0.1);
        padding: 5px 10px;
        box-sizing: border-box;
        .number {
          position: relative;
          border: 1px solid rgba(25, 186, 139, 0.17);
          ul {
            @font-face {
              font-family: electronicFont;
              src: url(@/assets/font/DS-DIGIT.TTF);
            }
            display: flex;
            li {
              list-style: none;
              position: relative;
              flex: 1;
              text-align: center;
              height: 50px;
              line-height: 50px;
              font-size: 40px;
              color: #ffeb7b;
              padding: 5px 0;
              font-family: electronicFont;
              font-weight: bold;
            }
          }
        }
        .title {
          display: flex;
          text-align: center;
          margin-top: 5px;
          .title1 {
            flex: 1;
          }
        }
        .number::before {
          content: "";
          position: absolute;
          width: 30px;
          height: 10px;
          border-top: 2px solid #02a6b5;
          border-left: 2px solid #02a6b5;
          top: 0;
          left: 0;
        }
        .number::after {
          content: "";
          position: absolute;
          width: 30px;
          height: 10px;
          border-bottom: 2px solid #02a6b5;
          border-right: 2px solid #02a6b5;
          right: 0;
          bottom: 0;
        }
      }
      .body {
        position: relative;
        height: 100%;
        .map1,
        .map2,
        .map3 {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          background: url(@/assets/images/map.png) no-repeat;
          background-size: 100% 100%;
          opacity: 0.3;
        }
        .map2 {
          width: 350px;
          height: 350px;
          background-image: url(@/assets/images/lbx.png);
          opacity: 0.6;
          animation: rotate 15s linear infinite;
          z-index: 2;
        }
        .map3 {
          width: 330px;
          height: 330px;
          background-image: url(@/assets/images/jt.png);
          animation: rotate1 10s linear infinite;
        }
        @keyframes rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes rotate1 {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }
      }
    }
  }
}
</style>
