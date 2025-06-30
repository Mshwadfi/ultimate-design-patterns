interface IStreamingService {
  playVideo(user: User, videoId: string): void;
}
class Video {
  constructor(
    public title: string,
    public id: string,
    public isPremium: boolean
  ) {}
}

class User {
  constructor(public name: string, public isPremium: boolean) {}
}

class StreamingService implements IStreamingService {
  private videos: Map<string, Video> = new Map();

  addVideo(video: Video) {
    this.videos.set(video.id, video);
  }
  getVideo(videoId: string) {
    return this.videos.get(videoId);
  }

  playVideo(user: User, videoId: string) {
    const video = this.videos.get(videoId);
    if (!video) {
      console.log("Video not found.");
      return;
    }

    console.log(`Playing video: ${video.title}`);
  }
}

class StreamingServiceProxy implements IStreamingService {
  realService: StreamingService;
  constructor(realService: StreamingService) {
    this.realService = realService;
  }

  playVideo(user: User, videoId: string): void {
    const video = this.realService.getVideo(videoId);

    if (!video) return console.log("Video not found.");

    if (video.isPremium && !user.isPremium) {
      return console.log(`Access denied. "${video.title}" is a premium video.`);
    }

    this.realService.playVideo(user, videoId);
  }
}

//example usage

const service = new StreamingService();
const video = new Video("intro", "1", false);
const premiumVideo = new Video("video 1", "2", true);
const user1 = new User("ali", false);
const user2 = new User("ahmed", true);

const proxy = new StreamingServiceProxy(service);
service.addVideo(video);
service.addVideo(premiumVideo);

proxy.playVideo(user1, "2");
proxy.playVideo(user2, "2");
