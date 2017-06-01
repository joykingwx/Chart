/**
 * Created by joyking on 2017-05-23.
 */
/*基本的图文对象*/
/*cfg 配制
{
    type: 'base',
        /!*text: 'this is wen ben nei rong',*!/
    css: {
        width: 200,
        height: 325,
        left: 30,
        top: 50,
        backgroundImage: 'url(../imgs/face_img_right.png)',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat'
    },
    animate: {
        onIn: {
            top: 20,
                opacity: 1
        },
        onOut: {
            top: 80,
                opacity: 0
        }
    },
    centent: true,
    relative:true
}*/
/**
 *
 * @param name 组件名称
 * @param cfg 配配制项
 * @returns {jQuery|HTMLElement}
 * @constructor 一个创建组件的通用方法。包括出厂、入厂动画、样式
 */
let H5ComponentBase = function (name,cfg) {
    let width = $(window).width();
    let config = cfg || {};
    let id = ('h5_c_'+Math.random()).replace('.','_');
    let cls = ' h5_component_'+config.type;
    let component = $('<div class="h5_component '+'h5_component_name_'+name+cls+'" id="'+id+'">');
    config.text && component.text(config.text);
    config.css && component.css(config.css);

    if(config.centent === true){
        component.css({
            left:(50-((config.css.width/2)/width)*100)+'%'
        })
    }

    if(config.reference !== undefined){
        let parent = $('body').find('.h5_component_name_'+config.reference);
        let thisLeft = config.css.left;
        if(config.css.left!= undefined &&thisLeft.substring(config.css.left.length-1,config.css.left.length) == '%'){
            thisLeft = parseFloat(thisLeft.substring(0,config.css.left.length-1));
        }else if(config.css.left!= undefined &&thisLeft.substring(config.css.left.length-1,config.css.left.length) == 'x'){
            thisLeft = parseInt(thisLeft.substring(0,config.css.left.length-2));
        }else{
            thisLeft = 0;
        }
        let position = {
            left:parseFloat(parent.css('left'))+thisLeft,
            top:parseFloat(parent.css('top')) +parseFloat(parent.css('height')) +config.css.top
        };
        if(cfg.center === true){
            position.left=0;
        }
        //component.css('transform','translate('+position.left+'px,'+position.top+'px)');
        component.css({left:position.left +'%',top:position.top})
    }



    if(typeof config.click == "function"){
        component.on('click',function(){
            config.click();
        })
    }

    /*定义动画*/
    component.on('onLoad',function () {
        $(this).addClass(cls+'_load').removeClass(cls+'_leave');
        config.animate && $(this).animate(config.animate.onIn);
        return false;
    });
    component.on('onLeave',function () {
        $(this).addClass(cls+'_leave').removeClass(cls+'_load');
        config.animate && $(this).animate(config.animate.onOut);
        return false;
    });
    if(config.referenceTo !== undefined){
        let parent = $('.h5_component_name_'+config.referenceTo);
        parent.append(component);
    }else{
        return component;
    }

};