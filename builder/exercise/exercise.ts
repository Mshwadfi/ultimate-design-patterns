type GraphicsQuality = "low" | "medium" | "high" | "ultra";
type SoundSettings = "mono" | "stereo" | "surround";
type GamingMode = "casual" | "competitive" | "professional";

class GameConfigManager {
  constructor(
    private readonly quality: GraphicsQuality,
    private readonly settings: SoundSettings,
    private readonly mode: GamingMode
  ) {}
  toJSON() {
    return {
      quality: this.quality,
      settings: this.settings,
      mode: this.mode,
    };
  }
}

class GameConfigBuilder {
  private quality!: GraphicsQuality;
  private settings!: SoundSettings;
  private mode!: GamingMode;

  setGraphicsQuality(quality: GraphicsQuality): this {
    this.quality = quality;
    return this;
  }

  setSoundSettings(settings: SoundSettings): this {
    this.settings = settings;
    return this;
  }

  setGamingMode(mode: GamingMode): this {
    this.mode = mode;
    return this;
  }

  build() {
    if (!this.quality || !this.settings || !this.mode) {
      throw new Error("Incomplete configuration");
    }
    return new GameConfigManager(this.quality, this.settings, this.mode);
  }
}

const config = new GameConfigBuilder()
  .setGraphicsQuality("high")
  .setSoundSettings("surround")
  .setGamingMode("professional")
  .build();

console.log(config.toJSON());
