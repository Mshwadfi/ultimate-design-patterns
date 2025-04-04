Design Patterns

1. Observer Pattern
   Example: Marketplace Notification System
   Problem Statement:
   We want to create a Marketplace Notification System where users can subscribe to notifications for new product arrivals or new offers in an online marketplace. Whenever a new product or a new offer is added to the marketplace, subscribed users should receive notifications. The system should allow:

-Adding new subscribers

-Cancelling subscriptions

However, the naïve approach has significant issues.

Naïve Solution:
In the naïve approach, we create:

A Marketplace class
A User class
Product and Offer classes
Each time a new product or offer is added, we manually notify all users.

Issues with this approach:
❌Violates Open/Closed Principle:

If we want to add a new event type (e.g., "job openings"), we have to modify existing code and add new notification logic inside the marketplace class.
❌ Tight Coupling:

The Marketplace class is tightly coupled with User. Any change in the notification system requires modifying the marketplace class.
Ideal Solution: Using the Observer Pattern
To fix the issues, we apply the Observer Pattern:

Define an EventType (e.g., NEW_PRODUCT, NEW_OFFER).
Maintain a list of subscribers for each event type.
Decouple Marketplace from User using a generic Subscriber interface.
Advantages:
✅ Open/Closed Principle:

New event types (e.g., "job openings") can be added without modifying existing code.
✅ Loose Coupling:

Marketplace doesn’t need to know the exact details of Subscribers. It simply triggers notifications.
✅ Extensibility:

We can easily add new types of subscribers (e.g., JobFinder, Customer).

Example 2: Blog & Newsletter Subscription System
Problem Statement:
We want to create a Blog & Newsletter Subscription System where users can subscribe to:

Blog posts (technical articles)
Newsletters (weekly news)
Whenever a new blog post or newsletter is published, subscribed users should receive notifications.

Observer Pattern Solution:
We define a ContentType enum to categorize blog posts and newsletters.
A Publisher class maintains a list of subscribers per content type.
Users (subscribers) receive notifications when new content is published.
Advantages:
✅ Decoupling: The Publisher class doesn’t depend on specific subscribers.
✅ Extensibility: New content types (e.g., videos, sheets) can be added without modifying existing logic.
✅ Reusable & Scalable: Any number of publishers and subscribers can exist independently.
