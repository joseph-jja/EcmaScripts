import MF from 'utils/mathFunctions';

let y = 5,
    direction = 1,
    timerID;

onmessage = (msg) => {

    if (msg && msg.data && msg.data.start) {
        timerID = setInterval(() => {
            if (direction) {
                y++;
            } else {
                y--;
            }
            if (y > 15) {
                direction = 0;
            } else if (y < 6) {
                direction = 1;
            }
            postMessage({
                mouth: y,
                omouth: MF.subtract(y, 4)
            });
        }, 100);
    } else if (msg && msg.data && msg.data.stop) {
        clearInterval(timerID);
    }
};