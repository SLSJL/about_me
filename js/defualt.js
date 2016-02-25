/**
 * Created by SUN on 2016/2/13 0013.
 */
// 路径配置
require.config({
    paths: {
        echarts: 'script/echarts-2.2.7/build/dist'
    }
});


function initPieCharts(id, classname, level) {
    require(
        [
            'echarts',
            'echarts/theme/shine',
            'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
        ],
        function (ec, theme) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById(id), theme);
            var radius = ['91%', '86%'];

            var labelTop = {
                normal: {
                    label: {
                        show: true,
                        position: 'center',
                        formatter: '{b}',
                        textStyle: {
                            fontFamily: "Microsoft Yahei Light",
                            fontSize: 24,
                            baseline: 'middle',
                            fontWeight: 600,
                            color: "#464646"
                        }
                    },
                    labelLine: {
                        show: false
                    }
                }
            };

            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>" + classname + ": &nbsp ({d}%)"
                },
                calculable: true,
                series: [
                    {
                        name: '掌握程度',
                        type: 'pie',
                        radius: radius,
                        itemStyle: labelTop,
                        data: [
                            {value: 100 - parseInt(level), name: ''},
                            {value: level, name: level + "%"},
                        ]
                    }
                ]
            };

            // 为echarts对象加载数据
            myChart.setOption(option);
        }
    );
}

function initBarChats(id) {
    require(
        [
            'echarts',
            'echarts/theme/shine',
            'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
        ],
        function (ec, theme) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById(id), theme);

            var labelTop = {
                normal: {
                    label: {
                        show: true,
                        position: 'center',
                        formatter: '{b}',
                        textStyle: {
                            fontFamily: "Microsoft Yahei Light",
                            fontSize: 24,
                            baseline: 'middle',
                            fontWeight: 600,
                            color: "#464646"
                        }
                    },
                    labelLine: {
                        show: false
                    }
                }
            };

            var option = {
                tooltip: {
                    trigger: 'item'
                },
                calculable: true,
                grid: {
                    borderWidth: 0,
                    y: 80,
                    y2: 60
                },
                xAxis: [
                    {
                        type: 'category',
                        show: false,
                        data: ['HTML', 'CSS', 'Javascript', 'jQuery', 'Bootstrap', 'Ps/AI', 'C#.Net', 'NodeJs']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        show: false
                    }
                ],
                series: [
                    {
                        name: '掌握程度',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    // build a color map as your need.
                                    var colorList = [
                                        '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                        '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                        '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{b}\n{c}%',
                                    textStyle: {
                                        fontFamily: "'Microsoft Yahei Light', 'Microsoft Yahei'",
                                        fontSize: 16,
                                        baseline: 'bottom'
                                    }
                                }
                            }
                        },
                        data: [90, 75, 60, 80, 30, 80, 30, 10]
                    }
                ]
            };


            // 为echarts对象加载数据
            myChart.setOption(option);
        }
    );
}

function makeCharts() {
    initPieCharts('HTML', 'HTML', 90);
    initPieCharts('CSS', 'CSS', 75);
    initPieCharts('Javascript', 'Javascript', 60);
    initPieCharts('jQuery', 'jQuery', 80);
    initPieCharts('Bootstrap', 'Bootstrap', 30);
    initPieCharts('PSAI', 'PS/AI', 80);
    initPieCharts('Csharp', 'C#', 30);
    initPieCharts('NodeJs', 'NodeJs', 10);

    initBarChats('chart-2');
}

function turn(classname) {
    var cls = classname;

    if (/rvs_front/.test(cls)) {
        cls = cls.replace(/rvs_front/, 'rvs_back');
    } else {
        cls = cls.replace(/rvs_back/, 'rvs_front');
    }
    return cls;
}

function browserDetecte() {
    if (/webkit/.test(navigator.userAgent.toLowerCase())) {
       // alert("webkit");
    }

    if (/firefox/.test(navigator.userAgent.toLowerCase())) {
        //alert('firefox');
    }

    if (/msie/.test(navigator.userAgent.toLowerCase())) {
        $('body').remove();
        alert('请使用最新版IE ，或 谷歌，火狐浏览器浏览 ：）');
    }

    if ('undefined' == typeof(document.body.style.maxHeight)) {
        $('body').remove();
        alert('请使用最新版IE ，或 谷歌，火狐浏览器浏览 ：）');
    }

    if (!$.support.leadingWhitespace) {
        $('body').remove();
        alert('请使用最新版IE ，或 谷歌，火狐浏览器浏览 ：）');
    }

    var ua = navigator.userAgent.toLowerCase();

    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {

        //浏览器类型
        var browserType = "IE";
        //浏览器版本
        var browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];

        alert("请使用 谷歌 或 火狐浏览器 观看最佳效果。")
    }
}

$(function () {

    browserDetecte();

    $('#photo').css('-webkit-transform', 'scale(1.2,1.2)')
        .css('-moz-transform', 'scale(1.2,1.2)')
        .css('-o-transform', 'scale(1.2,1.2)');

    makeCharts();

    $('#skill_a').click(function () {
        makeCharts();
    });

    $('.rvs_wrap').click(function () {
        $(this).attr('class', turn($(this).attr('class')));
        makeCharts();
    });


    var hadIN = false;

    $('.workcard > .rvs_wrap').mouseover(function () {
        if (!hadIN) {
            $(this).attr('class', turn($(this).attr('class')));
            hadIN = true;
        }
    }).mouseleave(function () {
        if (hadIN) {
            $(this).attr('class', turn($(this).attr('class')));
        }
        hadIN = false;
    }).unbind('click').bind('click', function () {


        var workCardID = $(this).parent().attr('id');
        var $gallery = $('#gallery');
        $gallery.children().remove();

        switch (workCardID) {
            case 'workcard_1':
            {
                $gallery.append(worksPics1);

                $('.boxer').boxer({
                    labels: {
                        close: "关闭",
                        count: "/",
                        next: "下一个",
                        previous: "上一个"
                    }
                });
                break;

            }

            case 'workcard_2':
            {
                $gallery.append(worksPics2);

                $('.boxer').boxer({
                    labels: {
                        close: "关闭",
                        count: "/",
                        next: "下一个",
                        previous: "上一个"
                    }
                });

                break;
            }

            case 'workcard_3':
            {
                $gallery.append(worksPics3);

                $('.boxer').boxer({
                    labels: {
                        close: "关闭",
                        count: "/",
                        next: "下一个",
                        previous: "上一个"
                    }
                });
                break;
            }
            default :
                ;
        }


        // 定位锚点
        $("html,body").animate({scrollTop: $gallery.offset().top}, 1000);
        $('#works_subpics').animate({height: 260}, 1000);

        $('#gallery_close').click(function () {

            $("html,body").animate({scrollTop: $("#works").offset().top}, 1000);
            $('#works_subpics').animate({height: 0}, "fast");
        })

    });


    $('.gallery-shortcut').click(function () {
        var shortcutID = $(this).attr('id');
        var $gallery = $('#gallery');
        $gallery.children().remove();

        switch (shortcutID) {
            case 'gallery-1':
            {

                $gallery.append(worksPics1);

                $('.boxer').boxer({
                    labels: {
                        close: "关闭",
                        count: "/",
                        next: "下一个",
                        previous: "上一个"
                    }
                });
                break;

            }

            case 'gallery-2':
            {
                $gallery.append(worksPics2);

                $('.boxer').boxer({
                    labels: {
                        close: "关闭",
                        count: "/",
                        next: "下一个",
                        previous: "上一个"
                    }
                });

                break;
            }

            case 'gallery-3':
            {
                $gallery.append(worksPics3);

                $('.boxer').boxer({
                    labels: {
                        close: "关闭",
                        count: "/",
                        next: "下一个",
                        previous: "上一个"
                    }
                });
                break;
            }
            default :
                ;
        }


        // 定位锚点
        $("html,body").animate({scrollTop: $gallery.offset().top}, 1000);
        $('#works_subpics').animate({height: 260}, 1000);

        $('#gallery_close').click(function () {

            $("html,body").animate({scrollTop: $("#works").offset().top}, 1000);
            $('#works_subpics').animate({height: 0}, "fast");
        })
    });


    $("#backTop").click(function () {
        $("html,body").animate({scrollTop: $("#menu-nav").offset().top}, 1000);
    }).mouseover(function(){
        $(this).css('background-color','rgba(0,0,0,.2)');
    }).mouseleave(function(){
        $(this).css('background-color','rgba(0,0,0,.4)');
    })
});
