import nipplejs from "nipplejs";
// import { runAction, idleAction } from '../Page/inputStore'
import { runAction, idleAction } from '../Actors/Player'


export function JoystickInit(joystickConRef, set) {

    var manager = nipplejs.create({
        zone: joystickConRef.current,
        mode: 'semi',
        // position: { left: '5%', top: '90%' },
        // color: 'red'
    });

    manager.on("move", function (evt, data) {
        const { x, y } = data.vector;

        set({ controls: { horizonAxis: -x, verticalAxis: y } })

        runAction.play();
        idleAction.stop();
    });

    manager.on("end", function (evt, data) {

        set({ controls: { horizonAxis: 0, verticalAxis: 0 } })

        runAction.stop();
        idleAction.play();
    });
}