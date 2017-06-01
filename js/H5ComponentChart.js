/**
 * Created by joyking on 2017-05-23.
 */
/*散点图*/
let H5ComponentPolyLine = function (name, cfg) {
    let component = H5ComponentBase(name, cfg);

    let w = cfg.css.width;
    let h = cfg.css.height;
    let cns = document.createElement('canvas');
    $(cns).data('cfg',cfg);
    let ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    component.data('cfg',cfg);
    component.on('onLoad', function () {
        let _this = $(this).find('canvas');
        let data = _this.data('cfg');
        let ctx = _this[0].getContext('2d');
        new Chart(ctx, data);
    });

    component.on('onLeave', function () {
        let _this = $(this).find('canvas');
        let data = _this.data('cfg');
        let ctx = _this[0].getContext('2d');
        let newData = {};
        newData.data ={};
        if(data.data.datasets != undefined){
            newData.data.datasets = [];
            for(let j = 0;j<data.data.datasets.length;j++){
                newData.data.datasets.push(data.data.datasets[j]);
                for(let i =0; i<newData.data.datasets[j].data.length;i++){
                    newData.data.datasets[j].data[i] = 0;
                }
            }

        }
        new Chart(ctx, newData);
    });
    return component;
};