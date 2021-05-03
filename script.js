class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play");
    this.muteButtons = document.querySelectorAll(".mute");
    this.resetButton = document.querySelector(".reset");

    this.currentKick = `./assets/sounds/kick-classic.wav`;
    this.currentSnare = `./assets/sounds/snare-lofi01.wav`;
    this.currentHihat = `./assets/sounds/hihat-808.wav`;

    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.selects = document.querySelectorAll("select");

    this.tempoSlider = document.querySelector(".tempo-slider");
    this.tempoNumber = document.querySelector(".tempo-number");

    this.index = 0;
    this.bpm = 150;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.index = 0;
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }

  repeat() {
    let step = this.index % 8;
    const activePad = document.querySelectorAll(`.b${step}`);
    activePad.forEach((pad) => {
      pad.style.animation = "play-track 0.3s alternate ease-in-out 2";
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  mute(e) {
    const trackName = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");

    if (e.target.classList.contains("active")) {
      e.target.innerHTML = '<i class="fas fa-volume-mute"></i>';

      switch (trackName) {
        case "kick":
          this.kickAudio.volume = 0;
          break;
        case "snare":
          this.snareAudio.volume = 0;
          break;
        case "hihat":
          this.hihatAudio.volume = 0;
          break;

        default:
          console.error("something went wrong :(");
          break;
      }
    } else {
      e.target.innerHTML = '<i class="fas fa-volume-up"></i>';

      switch (trackName) {
        case "kick":
          this.kickAudio.volume = 1;
          break;
        case "snare":
          this.snareAudio.volume = 1;
          break;
        case "hihat":
          this.hihatAudio.volume = 1;
          break;

        default:
          console.error("something went wrong :(");
          break;
      }
    }
  }

  reset() {
    this.pads.forEach((e) => {
      if (e.classList.contains("active")) {
        e.classList.remove("active");
      }
    });
  }

  activePad() {
    this.classList.toggle("active");
  }

  updatePlayButton() {
    if (!this.isPlaying) {
      this.playButton.innerHTML = `<i class="fas fa-stop"></i>`;
      this.playButton.classList.add("active");
    } else {
      this.playButton.innerHTML = `<i class="fas fa-play"></i>`;
      this.playButton.classList.remove("active");
    }
  }

  updateSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;

      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;

      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;

      default:
        console.error("something went wrong :(");
        break;
    }
  }

  changeTempo(e) {
    this.bpm = e.target.value;
    this.tempoNumber.innerHTML = e.target.value;
  }

  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;

    if (this.playButton.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

// event listener

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playButton.addEventListener("click", () => {
  drumKit.updatePlayButton();
  drumKit.start();
});

drumKit.resetButton.addEventListener("click", () => {
  drumKit.reset();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", (e) => {
    drumKit.updateSound(e);
  });
});

drumKit.muteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener("input", (e) => {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener("change", (e) => {
  drumKit.updateTempo();
});
