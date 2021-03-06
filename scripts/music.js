new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Lover",
          artist: "Taylor Swift",
          cover: "/images/lover_cover.jpg",
          source: "/songs/lover.mp3",
          url: "https://www.youtube.com/watch?v=-BjZmE2gtdo",
          favorited: false
        },
        {
          name: "Love Story",
          artist: "Taylor Swift",
          cover: "/images/love_story_cover.jpg",
          source: "/songs/love_story.mp3",
          url: "https://www.youtube.com/watch?v=8xg3vE8Ie_E",
          favorited: false
        },
        {
          name: "If I Lose Myself",
          artist: "OneRepublic",
          cover: "/images/if_i_lose_myself.jpg",
          source: "/songs/if_i_lose_myself.mp3",
          url: "https://www.youtube.com/watch?v=TGx0rApSk6w",
          favorited: false
        },
        {
          name: "Preacher",
          artist: "OneRepublic",
          cover: "/images/preacher.jpg",
          source: "/songs/preacher.mp3",
          url: "https://www.youtube.com/watch?v=QxX_KigR-xU",
          favorited: false
        },
        {
          name: "All This Time",
          artist: "OneRepublic",
          cover: "/images/all_this_time.jpg",
          source: "/songs/all_this_time.mp3",
          url: "https://www.youtube.com/watch?v=T7lUj_OSxhA",
          favorited: false
        },
        {
          name: "Apologize",
          artist: "OneRepublic",
          cover: "/images/apologize.png",
          source: "/songs/apologize.mp3",
          url: "https://www.youtube.com/watch?v=ZSM3w1v-A_Y",
          favorited: false
        },
        {
          name: "Buring Bridges",
          artist: "OneRepublic",
          cover: "/images/burning_bridges.jpg",
          source: "/songs/burning_bridges.mp3",
          url: "https://www.youtube.com/watch?v=8HaU7Lq0tew",
          favorited: false
        },
        {
          name: "The Beautiful Ones",
          artist: "Monarchy",
          cover: "/images/the_beautiful_ones.jpg",
          source: "/songs/the_beautiful_ones.mp3",
          url: "https://www.youtube.com/watch?v=9VdbWizyqIk",
          favorited: false
        },
        {
          name: "Dangerous",
          artist: "Michael Jackson",
          cover: "/images/dangerous.jpg",
          source: "/songs/dangerous.mp3",
          url: "https://www.youtube.com/watch?v=7jTq2FXKr0g",
          favorited: false
        },
        {
          name: "Lift Me Up(Michael Brun Remix)",
          artist: "OneRepublic",
          cover: "/images/lift_me_up.jpg",
          source: "/songs/lift_me_up.mp3",
          url: "https://www.youtube.com/watch?v=h3ozaXbri2o",
          favorited: false
        },
        {
          name: "Style",
          artist: "Taylor Swift",
          cover: "/images/style.jpg",
          source: "/songs/style.mp3",
          url: "https://www.youtube.com/watch?v=-CmadmM5cOk",
          favorited: false
        },
        {
          name: "1-800-273-8255",
          artist: "Logic",
          cover: "/images/1-800-273-8255.jpg",
          source: "/songs/1-800-273-8255.mp3",
          url: "https://www.youtube.com/watch?v=Kb24RrHIbFk",
          favorited: false
        },
        {
          name: "Brother",
          artist: "Kodaline",
          cover: "/images/brother_cover.jpg",
          source: "/songs/brother.mp3",
          url: "https://www.youtube.com/watch?v=m6TXPNybrmk",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
