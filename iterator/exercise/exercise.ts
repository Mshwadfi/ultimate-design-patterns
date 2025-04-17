class Profile {
  private id: number;
  private name: string;
  private email: string;
  private bio: string;

  constructor(id: number, name: string, email: string, bio: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.bio = bio;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getBio(): string {
    return this.bio;
  }
}

// Iterator interface
interface ProfileIterator {
  hasNext(): boolean;
  next(): Profile;
  reset(): void;
}

// Collection interface
interface ProfileCollection {
  addProfile(profile: Profile): void;
  removeProfile(profileId: number): void;
  createIterator(): ProfileIterator;
  size(): number;
}

// Concrete collection
class FriendsCollection implements ProfileCollection {
  private friends: Profile[] = [];

  constructor(friends: Profile[]) {
    this.friends = friends;
  }

  addProfile(profile: Profile): void {
    this.friends.push(profile);
  }

  removeProfile(profileId: number): void {
    this.friends = this.friends.filter(
      (profile) => profile.getId() !== profileId
    );
  }

  size(): number {
    return this.friends.length;
  }

  createIterator(): ProfileIterator {
    return new FriendsIterator(this);
  }

  getFriends(): Profile[] {
    return this.friends;
  }
}

// Concrete iterator
class FriendsIterator implements ProfileIterator {
  private collection: FriendsCollection;
  private position: number = 0;

  constructor(collection: FriendsCollection) {
    this.collection = collection;
  }

  hasNext(): boolean {
    return this.position < this.collection.getFriends().length;
  }

  next(): Profile {
    if (!this.hasNext()) {
      throw new Error("No more profiles to iterate");
    }
    return this.collection.getFriends()[this.position++];
  }

  reset(): void {
    this.position = 0;
  }
}
