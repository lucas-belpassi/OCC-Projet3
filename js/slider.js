class Slider {
    constructor() {
        this.interval = null;

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);

        this.play();

        $("#next").on("click", this.next);
        $("#previous").on("click", this.previous);
        $("#play").on("click", this.play);
        $("#pause").on("click", this.pause);

        $(document).on("keydown", e => {
			if (e.keyCode === 37) {
				this.previous(e);
			} else if (e.keyCode === 39) {
				this.next(e);
			}
        });
    }

    play() {
        this.interval = setInterval(this.next, 5000);
        $("#play").hide();
        $("#pause").show();

    }

    pause() {
        clearInterval(this.interval);
        $("#pause").hide();
        $("#play").show();

    }

    next(e) {
        if (typeof e !== "undefined") {
            this.pause;
        }
        let current = $("#pictures .active");
        let next = current.next("img");
        if (next.length === 0) {
            next = $("#pictures img").first();
        }
        current.toggleClass("active");
        next.toggleClass("active");
    }

    previous(e) {
        this.pause();
        let current = $("#pictures .active");
        let next = current.prev("img");
        if (next.length === 0) {
            next = $("#pictures img").last();
        }
        current.toggleClass("active");
        next.toggleClass("active");
    }
}