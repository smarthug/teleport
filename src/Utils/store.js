import create from 'zustand'

// import { runAction, idleAction } from '../Page/inputStore'
import { runAction, idleAction } from '../Actors/Player'
// my case 0 or 1 
function registerKeys(target, event, up = true) {
    const downHandler = ({ key }) => target.indexOf(key) !== -1 && event(1)
    const upHandler = ({ key }) => {
        target.indexOf(key) !== -1 && event(0);
        runAction.stop();
        idleAction.play();

    }
    window.addEventListener('keydown', downHandler)
    if (up) window.addEventListener('keyup', upHandler)
}


const useStore = create((set, get) => {
    // Register keys
    registerKeys(['ArrowUp', 'w', 'W'], (forward) => set((state) => ({ ...state, controls: { ...state.controls, verticalAxis: forward } })))
    registerKeys(['ArrowDown', 's', 'S'], (backward) => set((state) => ({ ...state, controls: { ...state.controls, verticalAxis: -backward } })))
    registerKeys(['ArrowLeft', 'a', 'A'], (left) => set((state) => ({ ...state, controls: { ...state.controls, horizonAxis: left } })))
    registerKeys(['ArrowRight', 'd', 'D'], (right) => set((state) => ({ ...state, controls: { ...state.controls, horizonAxis: -right } })))



    return {
        set,
        get,
        // increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
        ready: false,
        controls: { horizonAxis: 0, verticalAxis: 0 },
        velocity: [0, 0, 0],
        speed: 0,

    }
})

export { useStore }
