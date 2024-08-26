import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:eventy/models/user.dart';
import 'package:eventy/pages/home/nearby_event_card.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:eventy/constant/text_style.dart';
import 'package:eventy/pages/event_detail_page.dart';
import 'package:eventy/pages/home/upcoming_event_card.dart';
import 'package:eventy/widgets/ui_helper.dart';
import 'package:intl/intl.dart';

class Event {
  String id;
  String name;
  String description;
  DateTime eventDate;
  String image;
  String location;
  String organizer;
  num price;

  Event({
    required this.id,
    required this.eventDate,
    required this.image,
    required this.location,
    required this.name,
    required this.organizer,
    required this.price,
    required this.description,
  });

  // Create a factory constructor to convert Firestore data to an Event object.
  factory Event.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;

    // Parse the eventDate string into DateTime
    DateTime eventDate = parseDate(data['eventDate'] as String);

    return Event(
      eventDate: eventDate,
      id: doc.id,
      image: data['image'],
      location: data['location'],
      name: data['name'],
      organizer: data['organizer'],
      price: data['price'],
      description: data['description'],
    );
  }
}

void viewEventDetail(BuildContext context, Event event) {
  //i want to print the event -> document id ...
  Navigator.of(context).push(
    PageRouteBuilder(
      opaque: false,
      barrierDismissible: true,
      transitionDuration: const Duration(milliseconds: 300),
      pageBuilder: (BuildContext context, animation, __) {
        return FadeTransition(
          opacity: animation,
          child: EventDetailPage(event),
        );
      },
    ),
  );
}

DateTime parseDate(String dateString) {
  // Define the input format
  DateFormat format = DateFormat("dd-MMM-yyyy");

  // Parse the date
  return format.parse(dateString);
}

class BuildUpComingEventList extends StatelessWidget {
  BuildUpComingEventList({super.key});

  FirebaseFirestore firestore = FirebaseFirestore.instance;
  final String currentUserId = FirebaseAuth.instance.currentUser?.uid ?? '';

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<DocumentSnapshot>(
      stream: firestore.collection('Users').doc(currentUserId).snapshots(),
      builder:
          (BuildContext context, AsyncSnapshot<DocumentSnapshot> userSnapshot) {
        if (userSnapshot.hasError) {
          return const Text("Something went wrong");
        }

        if (userSnapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator();
        }

        if (userSnapshot.hasData) {
          List<String> joinedEventsId =
              List<String>.from(userSnapshot.data!['joinedEventsId'] ?? []);

          if (joinedEventsId.isEmpty) {
            return const SizedBox(height: 10);
          }

          return StreamBuilder<QuerySnapshot>(
            stream: firestore
                .collection('events')
                .where(FieldPath.documentId, whereIn: joinedEventsId)
                .snapshots(),
            builder: (BuildContext context,
                AsyncSnapshot<QuerySnapshot> eventsSnapshot) {
              if (eventsSnapshot.hasError) {
                return const Text("Something went wrong");
              }

              if (eventsSnapshot.connectionState == ConnectionState.waiting) {
                return const CircularProgressIndicator();
              }

              if (eventsSnapshot.hasData) {
                List<Event> upcomingEvents =
                    eventsSnapshot.data!.docs.map((doc) {
                  return Event.fromFirestore(doc);
                }).toList();

                // Sort the events by eventDate
                upcomingEvents
                    .sort((a, b) => a.eventDate.compareTo(b.eventDate));

                return Container(
                  padding: const EdgeInsets.only(left: 16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(
                        "Joined Events",
                        style: headerStyle.copyWith(color: Colors.white),
                      ),
                      UIHelper.verticalSpace(16),
                      SizedBox(
                        height: 250,
                        child: ListView.builder(
                          itemCount: upcomingEvents.length,
                          physics: const BouncingScrollPhysics(),
                          scrollDirection: Axis.horizontal,
                          itemBuilder: (context, index) {
                            final event = upcomingEvents[index];
                            return UpComingEventCard(
                                event: event,
                                onTap: () => viewEventDetail(context, event));
                          },
                        ),
                      ),
                    ],
                  ),
                );
              }

              return const Text("No data available");
            },
          );
        }

        return const Text("No user data available");
      },
    );
  }
}

class BuildMostPopularEvents extends StatelessWidget {
  BuildMostPopularEvents({super.key, required this.controller});
  final Animation<double> controller;

  FirebaseFirestore firestore = FirebaseFirestore.instance;

  CollectionReference events = FirebaseFirestore.instance.collection('events');

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<QuerySnapshot>(
      future: events.orderBy('numOfParticipants', descending: true).get(),
      builder: (BuildContext context, AsyncSnapshot<QuerySnapshot> snapshot) {
        if (snapshot.hasError) {
          return const Text("Something went wrong");
        }

        if (snapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator();
        }

        if (snapshot.hasData) {
          List<Event> nearbyEvents = snapshot.data!.docs.map((doc) {
            return Event.fromFirestore(doc);
          }).toList();

          return Container(
            decoration: const BoxDecoration(
              borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
              color: Colors.white,
            ),
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    const Text("Most Popular Event", style: headerStyle),
                    const Spacer(),
                    // const Icon(Icons.more_horiz),
                    UIHelper.horizontalSpace(16),
                  ],
                ),
                ListView.builder(
                  itemCount: nearbyEvents.length,
                  shrinkWrap: true,
                  primary: false,
                  itemBuilder: (context, index) {
                    final event = nearbyEvents[index];
                    var animation =
                        Tween<double>(begin: 800.0, end: 0.0).animate(
                      CurvedAnimation(
                        parent: controller,
                        curve: Interval((1 / nearbyEvents.length) * index, 1.0,
                            curve: Curves.decelerate),
                      ),
                    );
                    return AnimatedBuilder(
                      animation: animation,
                      builder: (context, child) => Transform.translate(
                        offset: Offset(animation.value, 0.0),
                        child: NearbyEventCard(
                          event: event,
                          onTap: () => viewEventDetail(context, event),
                        ),
                      ),
                    );
                  },
                ),
              ],
            ),
          );
        }

        return const Text("No data available");
      },
    );
  }
}
