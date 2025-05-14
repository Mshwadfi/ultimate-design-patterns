interface VideoQuality {
  render(): void;
}

class HDVideoQuality implements VideoQuality {
  render(): void {
    console.log("rendering video in hd...");
  }
}

class SDVideoQuality implements VideoQuality {
  render(): void {
    console.log("rendering video in sd...");
  }
}

class FullHDVideoQuality implements VideoQuality {
  render(): void {
    console.log("Rendering video in Full HD (1080p)...");
  }
}

class UltraHDVideoQuality implements VideoQuality {
  render(): void {
    console.log("Rendering video in 4K Ultra HD...");
  }
}

interface VideoProvider {
  playback(videoId: string): void;
}

class YoutubeProvider implements VideoProvider {
  private videoQuality: VideoQuality;
  constructor(videoQuality: VideoQuality) {
    this.videoQuality = videoQuality;
  }

  playback(videoId: string) {
    console.log(`palying youtube video of id: ${videoId}...`);
    return this.videoQuality.render();
  }
}
class TwitchProvider implements VideoProvider {
  constructor(private videoQuality: VideoQuality) {}

  playback(videoId: string): void {
    console.log(`Playing Twitch video with ID: ${videoId}...`);
    this.videoQuality.render();
  }
}

class VimeoProvider implements VideoProvider {
  constructor(private videoQuality: VideoQuality) {}

  playback(videoId: string): void {
    console.log(`Playing Vimeo video with ID: ${videoId}...`);
    this.videoQuality.render();
  }
}

const youtubeHD = new YoutubeProvider(new HDVideoQuality());
youtubeHD.playback("yt123");

const twitchSD = new TwitchProvider(new SDVideoQuality());
twitchSD.playback("tw456");

const vimeo4K = new VimeoProvider(new UltraHDVideoQuality());
vimeo4K.playback("vm789");

const youtubeFullHD = new YoutubeProvider(new FullHDVideoQuality());
youtubeFullHD.playback("yt999");
