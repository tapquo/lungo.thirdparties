/**
 * Mock Generatos
 *
 * @namespace Lungo.Sugar
 * @class Growl
 * @version 2.0
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Sugar.Mock = (function(lng, undefined) {

    /**
     *
     */
    var create = function(model, count) {
        var list = [];
        for (var i = 0; i < count; i++) {
            list.push(model);
        }
        return list;
    };

    return {
        create: create
    };

})(Lungo);



// els = Lungo.Sugar.Mock.create([m'user', 'nicknae', '11'], 1000);
els = Lungo.Sugar.Mock.create({
    user: 'Lorem Ipsum', description: 'askdakldkald', count: 10
}, 1000);
