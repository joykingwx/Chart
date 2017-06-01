/**
 * Created by joyking on 2017-05-23.
 */
/*添加页*/
let H5 = function(){
    this.id = (''+Math.random()).replace('.','_');
    this.el = $('<div class="H5" id="'+this.id+'">').hide();
    this.page = [];
    $('body').append(this.el);
    /*添加页面*/
    this.addPage = function(name,text){
        let page = $('<div class="h5_page section">').css({position:'relative'});
        if(name != undefined){
            page.addClass('h5_page_'+name);
        }
        if(text != undefined){
            page.text(text);
        }
        this.el.append(page);
        this.page.push(page);
        return this;
    };
    /*添加组件*/
    this.addComponent = function(name,cfg){
        let config = cfg || {};
        config = $.extend({
            type:'base'
        },config);
        let component;
        let page = this.page.slice(-1)[0];
        switch(config.type){
            case 'base':
                component = new H5ComponentBase(name,config);
                break;
            default:

        }
        if(component == undefined){

        }else{
            page.append(component);
        }

        return this;
    };
    this.loader = function () {
        this.el.fullpage({
            sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
            onLeave: function (index, nextIndex, direction) {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad: function (anchorLink, index) {
                $(this).find('.h5_component').trigger('onLoad');
            }
        });

        this.el.show();
    }
    return this;
};