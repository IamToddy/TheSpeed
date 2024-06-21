const video = document.getElementById('video');
const speedDisplay = document.getElementById('speed');

async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        video.srcObject = stream;
    } catch (error) {
        console.error('Error accessing the camera', error);
        alert('Kameraet kan ikke aksesseres. Vennligst sørg for at du gir tillatelse til å bruke kameraet og at du kjører dette over HTTPS.');
    }
}

async function detectObjects() {
    const model = await cocoSsd.load();
    video.addEventListener('loadeddata', async () => {
        const predictions = await model.detect(video);

        // Forenklet måte å finne bilen og beregne hastigheten (du må implementere dette mer presist)
        const car = predictions.find(pred => pred.class === 'car');
        if (car) {
            const currentTime = new Date().getTime();
            const currentPos = car.bbox;

            if (lastPos) {
                const timeElapsed = (currentTime - lastTime) / 1000; // i sekunder
                const distance = Math.sqrt(
                    Math.pow(currentPos[0] - lastPos[0], 2) + Math.pow(currentPos[1] - lastPos[1], 2)
                );
                const speedMps = distance / timeElapsed;
                const speedKph = speedMps * 3.6;
                speedDisplay.innerText = speedKph.toFixed(2);
            }

            lastTime = currentTime;
            lastPos = currentPos;
        }

        requestAnimationFrame(detectObjects);
    });
}

let lastTime;
let lastPos;

initCamera().then(detectObjects);
