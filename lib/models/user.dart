import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:intl/intl.dart';

class UserModel {
  String? userId;
  String email;
  String? fullName;
  String? photoUrl;
  List<String>? joinedEventsId;
  UserModel({
    required this.email,
    this.fullName,
    this.userId,
    this.photoUrl,
  });
  Future<void> addUser() {
    CollectionReference users = FirebaseFirestore.instance.collection("Users");
    return users.doc(this.userId).set({
      'userId': this.userId,
      'fullName': this.fullName,
      'email': this.email,
      'photoUrl': photoUrl ?? '',
      'joinedEventsId': joinedEventsId ?? [],
    });
  }

  Future<bool> isJoined(String eventId) async {
    CollectionReference users = FirebaseFirestore.instance.collection("Users");
    DocumentSnapshot userDoc = await users.doc(this.userId).get();

    if (userDoc.exists) {
      List<dynamic> joinedEventsId = userDoc['joinedEventsId'] ?? [];
      return joinedEventsId.contains(eventId);
    } else {
      return false;
    }
  }

  Future<void> pushEvent(String eventId) async {
    CollectionReference events =
        FirebaseFirestore.instance.collection("events");
    DocumentReference eventDoc = events.doc(eventId);

    CollectionReference users = FirebaseFirestore.instance.collection("Users");
    DocumentSnapshot userDoc = await users.doc(this.userId).get();

    if (userDoc.exists) {
      Map<String, dynamic> userData = userDoc.data() as Map<String, dynamic>;
      String email = userData['email'];
      String fullName = userData['fullName'] ?? '';

      // Add user details to the joinedUsers subcollection within the event document
      await eventDoc.collection('joinedUsers').doc(this.userId).set({
        'email': email,
        'fullName': fullName,
        'attendance': false,
      });

      // Get the count of documents in the joinedUsers subcollection
      QuerySnapshot joinedUsersSnapshot =
          await eventDoc.collection('joinedUsers').get();
      int numOfParticipants = joinedUsersSnapshot.docs.length;

      // Increment the numOfParticipants field
      await eventDoc.update({
        'numOfParticipants': numOfParticipants,
      });

      // Optionally update the user's document to reflect the joined event
      await users.doc(this.userId).update({
        'joinedEventsId': FieldValue.arrayUnion([eventId]),
      });
    } else {
      throw Exception("User document does not exist.");
    }
  }

  Future<void> removeEvent(String eventId) async {
    CollectionReference events =
        FirebaseFirestore.instance.collection("events");
    DocumentReference eventDoc = events.doc(eventId);

    // Check if the event document exists
    DocumentSnapshot eventSnapshot = await eventDoc.get();
    if (eventSnapshot.exists) {
      // Remove the user's document from the joinedUsers subcollection
      await eventDoc.collection('joinedUsers').doc(this.userId).delete();

      // Get the updated count of documents in the joinedUsers subcollection
      QuerySnapshot joinedUsersSnapshot =
          await eventDoc.collection('joinedUsers').get();
      int numOfParticipants = joinedUsersSnapshot.docs.length;

      // Update the numOfParticipants field
      await eventDoc.update({
        'numOfParticipants': numOfParticipants,
      });

      // Optionally update the user's document to reflect the removed event
      CollectionReference users =
          FirebaseFirestore.instance.collection("Users");
      await users.doc(this.userId).update({
        'joinedEventsId': FieldValue.arrayRemove([eventId]),
      });
    } else {
      print("Document does not exist, cannot remove event");
      // Optionally handle the case where the document doesn't exist
    }
  }
}
