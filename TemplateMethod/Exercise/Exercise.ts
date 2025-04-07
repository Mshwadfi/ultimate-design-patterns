interface UserPreferences {
  colorSettings: {
    brightness: number;
    contrast: number;
    saturation: number;
  };
  filterSettings: {
    type: string;
    intensity: number;
  };
}

abstract class VideoPreset {
  protected userPreferences: UserPreferences;
  constructor(userPreferences: UserPreferences) {
    this.userPreferences = userPreferences;
  }
  processVideo() {
    console.log("start Processing Video ...");
    this.enhanceVideoQuality();
    this.applyColorCorection();
    this.enhanceAudioQuality();
    this.applyFilters();
    this.renderVideo();
  }

  enhanceVideoQuality() {
    console.log("Enhancing video quality with standard algorithms");
  }
  enhanceAudioQuality() {
    console.log(
      "Enhancing audio quality with noise reduction and normalization"
    );
  }
  applyColorCorection() {
    const { brightness, contrast, saturation } =
      this.userPreferences.colorSettings;
    console.log(
      `Applying color correction: brightness=${brightness}, contrast=${contrast}, saturation=${saturation}`
    );
  }
  applyFilters() {
    const { type, intensity } = this.userPreferences.filterSettings;
    console.log(`Applying ${type} filter with intensity ${intensity}`);
  }

  abstract renderVideo(): void;
}

//--------------------------------------------------------------------------------------------------
class FHDVideoPreset extends VideoPreset {
  renderVideo(): void {
    console.log("Rendering video in Full HD (1920x1080) quality");
    console.log("Using high bitrate encoding for superior quality");
  }
}
//--------------------------------------------------------------------------------------------------
class HDVideoPreset extends VideoPreset {
  renderVideo(): void {
    console.log("Rendering video in HD (1280x720) quality");
    console.log(
      "Using medium bitrate encoding for balanced quality and file size"
    );
  }
}
//--------------------------------------------------------------------------------------------------
class SDVideoPreset extends VideoPreset {
  renderVideo(): void {
    console.log("Rendering video in SD (854x480) quality");
    console.log("Using low bitrate encoding for smaller file size");
  }
}
//--------------------------------------------------------------------------------------------------

const userPreferences: UserPreferences = {
  colorSettings: {
    brightness: 1.2,
    contrast: 1.1,
    saturation: 0.9,
  },
  filterSettings: {
    type: "cinematic",
    intensity: 0.7,
  },
};

console.log("---- FHD VIDEO PRESET ----");
const fhdPreset = new FHDVideoPreset(userPreferences);
fhdPreset.processVideo();

console.log("\n---- HD VIDEO PRESET ----");
const hdPreset = new HDVideoPreset(userPreferences);
hdPreset.processVideo();

console.log("\n---- SD VIDEO PRESET ----");
const sdPreset = new SDVideoPreset(userPreferences);
