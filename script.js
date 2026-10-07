const canvas = document.getElementById("ocean");
const ctx = canvas.getContext("2d");

const slider = document.getElementById("time");

const moodName = document.getElementById("mood-name");
const moodTime = document.getElementById("mood-time");


// ─────────────────────────────
// CANVAS SIZE
// ─────────────────────────────

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// ─────────────────────────────
// STARS
// ─────────────────────────────

const stars = [];

for (let i = 0; i < 100; i++) {

    stars.push({

        x: Math.random(),
        y: Math.random() * 0.55,

        size: Math.random() * 2 + 0.5,

        brightness: Math.random()

    });

}


// ─────────────────────────────
// DRAW STARS
// ─────────────────────────────

function drawStars(progress) {

    // Зірки з'являються тільки вночі

    if (progress < 0.72) {
        return;
    }

    const darkness = (progress - 0.72) / 0.28;

    for (let star of stars) {

        const alpha =
            darkness * star.brightness;

        ctx.fillStyle =
            `rgba(255,255,255,${alpha})`;

        ctx.beginPath();

        ctx.arc(
            star.x * canvas.width,
            star.y * canvas.height,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}


// ─────────────────────────────
// LIGHTHOUSE
// ─────────────────────────────

function drawLighthouse(progress) {

    const width = canvas.width;
    const height = canvas.height;

    // Маяк у правому нижньому кутку

    const x = width - 100;
    const groundY = height * 0.72;


    // Острів

    ctx.fillStyle = "#172b32";

    ctx.beginPath();

    ctx.ellipse(
        x,
        groundY + 10,
        75,
        18,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Вежа

    ctx.fillStyle = "#e8e1d0";

    ctx.beginPath();

    ctx.moveTo(x - 18, groundY);

    ctx.lineTo(x - 12, groundY - 100);

    ctx.lineTo(x + 12, groundY - 100);

    ctx.lineTo(x + 18, groundY);

    ctx.closePath();

    ctx.fill();


    // Червоні смуги

    ctx.fillStyle = "#b94d45";

    ctx.fillRect(
        x - 15,
        groundY - 75,
        30,
        12
    );

    ctx.fillRect(
        x - 16,
        groundY - 40,
        32,
        12
    );


    // Верхня частина

    ctx.fillStyle = "#222b30";

    ctx.fillRect(
        x - 20,
        groundY - 110,
        40,
        12
    );


    // Світло

    const night =
        progress > 0.72;

    if (night) {

        const glow =
            ctx.createRadialGradient(
                x,
                groundY - 116,
                2,
                x,
                groundY - 116,
                45
            );

        glow.addColorStop(
            0,
            "rgba(255,240,150,1)"
        );

        glow.addColorStop(
            0.3,
            "rgba(255,220,100,0.5)"
        );

        glow.addColorStop(
            1,
            "rgba(255,220,100,0)"
        );

        ctx.fillStyle = glow;

        ctx.beginPath();

        ctx.arc(
            x,
            groundY - 116,
            45,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    // Ліхтар

    ctx.fillStyle =
        night ? "#fff2a0" : "#ffd76a";

    ctx.beginPath();

    ctx.arc(
        x,
        groundY - 116,
        9,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Дах

    ctx.fillStyle = "#20282d";

    ctx.beginPath();

    ctx.moveTo(
        x - 23,
        groundY - 110
    );

    ctx.lineTo(
        x,
        groundY - 128
    );

    ctx.lineTo(
        x + 23,
        groundY - 110
    );

    ctx.closePath();

    ctx.fill();

}


// ─────────────────────────────
// OCEAN
// ─────────────────────────────

function drawOcean(value) {

    const width = canvas.width;
    const height = canvas.height;

    const progress = value / 1000;


    // ─────────────────────────
    // SKY COLORS
    // ─────────────────────────

    let topColor;
    let bottomColor;


    if (progress < 0.25) {

        topColor = "#263b68";
        bottomColor = "#e4a878";

    }

    else if (progress < 0.55) {

        topColor = "#4d9ac0";
        bottomColor = "#d7c38d";

    }

    else if (progress < 0.75) {

        topColor = "#e8784f";
        bottomColor = "#293d62";

    }

    else {

        topColor = "#070d22";
        bottomColor = "#101b38";

    }


    const sky =
        ctx.createLinearGradient(
            0,
            0,
            0,
            height
        );

    sky.addColorStop(
        0,
        topColor
    );

    sky.addColorStop(
        0.6,
        bottomColor
    );

    sky.addColorStop(
        1,
        "#071426"
    );


    ctx.fillStyle = sky;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    // ─────────────────────────
    // STARS
    // ─────────────────────────

    drawStars(progress);


    // ─────────────────────────
    // SUN
    // ─────────────────────────

    if (progress < 0.8) {

        const sunX =
            width *
            (0.15 + progress * 0.75);

        let sunY;


        if (progress < 0.6) {

            sunY =
                height *
                (0.28 + progress * 0.1);

        }

        else {

            sunY =
                height *
                (0.34 + (progress - 0.6) * 1.4);

        }


        const sun =
            ctx.createRadialGradient(
                sunX,
                sunY,
                5,
                sunX,
                sunY,
                100
            );


        sun.addColorStop(
            0,
            "rgba(255,245,190,1)"
        );

        sun.addColorStop(
            0.3,
            "rgba(255,200,100,0.8)"
        );

        sun.addColorStop(
            1,
            "rgba(255,150,50,0)"
        );


        ctx.fillStyle = sun;

        ctx.beginPath();

        ctx.arc(
            sunX,
            sunY,
            100,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    // ─────────────────────────
    // OCEAN
    // ─────────────────────────

    const seaY =
        height * 0.58;


    const sea =
        ctx.createLinearGradient(
            0,
            seaY,
            0,
            height
        );


    sea.addColorStop(
        0,
        "#12617a"
    );

    sea.addColorStop(
        1,
        "#031525"
    );


    ctx.fillStyle = sea;

    ctx.fillRect(
        0,
        seaY,
        width,
        height - seaY
    );


    // ─────────────────────────
    // WAVES
    // ─────────────────────────

    for (let i = 0; i < 18; i++) {

        const y =
            seaY + i * 25;


        ctx.beginPath();


        for (
            let x = 0;
            x <= width;
            x += 10
        ) {

            const wave =
                Math.sin(
                    x * 0.015 +
                    i * 0.8
                ) * 5;


            ctx.lineTo(
                x,
                y + wave
            );

        }


        ctx.strokeStyle =
            `rgba(255,255,255,${0.13 - i * 0.005})`;

        ctx.lineWidth = 1.5;

        ctx.stroke();

    }


    // ─────────────────────────
    // LIGHTHOUSE
    // ─────────────────────────

    drawLighthouse(progress);

}


// ─────────────────────────────
// MOOD
// ─────────────────────────────

function updateMood(value) {

    const progress = value / 1000;


    if (progress < 0.2) {

        moodName.textContent =
            "DAWN";

        moodTime.textContent =
            "06:00";

    }

    else if (progress < 0.4) {

        moodName.textContent =
            "MORNING";

        moodTime.textContent =
            "09:00";

    }

    else if (progress < 0.6) {

        moodName.textContent =
            "DAY";

        moodTime.textContent =
            "13:00";

    }

    else if (progress < 0.8) {

        moodName.textContent =
            "GOLDEN HOUR";

        moodTime.textContent =
            "19:12";

    }

    else {

        moodName.textContent =
            "NIGHT";

        moodTime.textContent =
            "23:00";

    }

}


// ─────────────────────────────
// SLIDER
// ─────────────────────────────

slider.addEventListener(
    "input",
    function () {

        drawOcean(this.value);

        updateMood(this.value);

    }
);


// ─────────────────────────────
// START
// ─────────────────────────────

drawOcean(slider.value);

updateMood(slider.value);
