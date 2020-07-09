class Signature {
    constructor() {
        this.canvas = document.getElementById("sign-in");
        this.context = this.canvas.getContext("2d");
        this.signing = false;
        this.position = { x: null, y: null };
        this.signed = false;
        this.resize();

        // Au toucher pour smartphone et tablettes//
        this.canvas.addEventListener("touchstart", this.start.bind(this, true));
        this.canvas.addEventListener("touchend", this.finish.bind(this));
        this.canvas.addEventListener("touchmove", this.draw.bind(this, true));

        // A la souris pour PC //
        this.canvas.addEventListener("mousedown", this.start.bind(this, false));
        this.canvas.addEventListener("mouseup", this.finish.bind(this));
        this.canvas.addEventListener("mousemove", this.draw.bind(this, false));

        window.addEventListener("resize", this.resize.bind(this));
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.signed = false;
    }

    start(touch, e) {
        this.signing = true;
        if (touch) {
            this.position.x = e.touches[0].clientX - this.canvas.getBoundingClientRect().left;
            this.position.y = e.touches[0].clientY - this.canvas.getBoundingClientRect().top;
        } else {
            this.position.x = e.clientX - this.canvas.getBoundingClientRect().left;
            this.position.y = e.clientY - this.canvas.getBoundingClientRect().top;
        }
        e.preventDefault();
    }

    finish() {
        this.signing = false;
    }

    draw(touch, e) {
        if (!this.signing) return;
        this.signed = true;
        this.context.lineWidth = 2;
        this.context.lineCap = "round";

        this.context.beginPath();
        this.context.moveTo(this.position.x, this.position.y);

        if (touch) {
            this.position.x = e.touches[0].clientX - this.canvas.getBoundingClientRect().left;
            this.position.y = e.touches[0].clientY - this.canvas.getBoundingClientRect().top;
        } else {
            this.position.x = e.clientX - this.canvas.getBoundingClientRect().left;
            this.position.y = e.clientY - this.canvas.getBoundingClientRect().top;
        }

        this.context.lineTo(this.position.x, this.position.y);
        this.context.closePath();
        this.context.stroke();
    }
}