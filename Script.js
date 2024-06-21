<script>
    const video = document.getElementById('video');
    const speedDisplay = document.getElementById('speed');
    let startTime, endTime;
    const distanceInput = document.getElementById('distance');

    // Tilgang til kameraet
    async function initCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
            video.srcObject = stream;
        } catch (error) {
            console.error('Error accessing the camera', error);
            alert('Kameraet kan ikke aksesseres. Vennligst sørg for at du gir tillatelse til å bruke kameraet og at du kjører dette over HTTPS.');
        }
    }

    // Funksjon for å starte måling
    function startMeasurement() {
        startTime = new Date().getTime();
        video.addEventListener('click', endMeasurement);
    }

    // Funksjon for å avslutte måling og beregne hastighet
    function endMeasurement() {
        endTime = new Date().getTime();
        const distance = parseFloat(distanceInput.value);
        const time = (endTime - startTime) / 1000; // tid i sekunder
        const speedMps = distance / time;
        const speedKph = speedMps * 3.6;
        speedDisplay.innerText = speedKph.toFixed(2);

        // Fjern event listener
        video.removeEventListener('click', endMeasurement);
    }

    // Initialiser kameraet
    initCamera();
</script>
