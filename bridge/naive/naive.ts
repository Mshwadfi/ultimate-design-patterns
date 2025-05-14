interface VideoProvider {
  playback(videoURL: string): void;
}

class YoutubeVideoProvider implements VideoProvider {
  playback(videoURL: string): void {
    console.log("Playing youtube video...");
  }
}

class TwitchVideoProvider implements VideoProvider {
  playback(videoURL: string): void {
    console.log("Playing Twitch video...");
  }
}

class HDVideoQuality {
  render() {
    console.log("rendering video in HD Quality...");
  }
}

class SDVideoQuality {
  render() {
    console.log("rendering video in SD Quality...");
  }
}

const youtubeProvider = new YoutubeVideoProvider();
const twitchProvider = new TwitchVideoProvider();
const HDRenderer = new HDVideoQuality();
const SDREnderer = new SDVideoQuality();

console.log(youtubeProvider.playback("1234.mp4"));
console.log(HDRenderer.render());
console.log(twitchProvider.playback("1234.mp4"));
console.log(SDREnderer.render());
