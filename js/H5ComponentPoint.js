/**
 * Created by joyking on 2017-05-23.
 */
/*散点图*/
let H5ComponentPoint = function (name, cfg) {
    let component = H5ComponentBase(name, cfg);
    let baseSize = cfg.data[0][1];
    $.each(cfg.data, function (index, item) {
        let point = $(`<div class="point point${index}">`);
        let name = $(`<div class="name">${item[0]}</div>`);
        let rate = $(`<div class="per">${item[1]*100}%</div>`);
        name.append(rate);
        point.append(name);
        component.append(point);
        point.css({
            width: (item[1]/baseSize*100)+'%',
            height: (item[1]/baseSize*100)+'%',
            borderRadius:'50%',
            backgroundColor:item[2],
            position:'absolute'
        });
        if(item[3] != undefined && item[4] != undefined){
            point.css({left:item[3],top:item[4]});
            point.data('left',item[3]).data('top',item[4]);
        }

        name.css({
            height:30,
            width:'100%',
            marginTop:-15,
            textAlign:'center',
            position:'absolute',
            top:'50%',
            fontSize:'20px'
        });
        rate.css('fontSize','.5rem');
        point.css('zIndex',100-index);
        point.css('left',0).css('top',0);
        point.css('transition',`all 1s ${index*.5}s `);
        point.css('opacity',`0`);

    });
    //  任务三：onLoad之后取出暂存的left、top 并且附加到 CSS 中
    component.on('onLoad',function(){
        component.find('.point').each(function(idx,item){
            $(item).css('left',$(item).data('left')).css('top',$(item).data('top'));
            $(item).css({
                opacity:1,
                transform:'scale(1)'
            })
        })
    });
    // 任务 四：onLeave之后，还原初始的位置
    component.on('onLeave',function(){
        component.find('.point').each(function(idx,item){
            $(item).css('left',0).css('top',0);
            $(item).css({
                opacity:0,
                transform:'scale(.1)'
            })
        })
    });



    return component;
};