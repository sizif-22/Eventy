import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:eventy/models/event_model.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:intl/intl.dart';

class QrCodePage extends StatelessWidget {
  const QrCodePage({super.key});
  static const qrCodeRoute = '/qrcode';

  @override
  Widget build(BuildContext context) {
    final user = FirebaseAuth.instance.currentUser;

    if (user == null) {
      return const Center(child: Text('No user is signed in'));
    }

    final userId = user.uid;
    final email = user.email ?? '';

    return FutureBuilder<List<Event>>(
      future: _fetchUpcomingEvents(userId),
      builder: (context, eventsSnapshot) {
        if (eventsSnapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (eventsSnapshot.hasError) {
          return const Center(child: Text('Error fetching events data'));
        }

        final events = eventsSnapshot.data ?? [];
        final eventDetails = events
            .map((event) =>
                '${event.name} (${DateFormat('dd-MMM-yyyy').format(event.eventDate)})')
            .join(', ');

        final qrData = 'Email: $email\nEvents: $eventDetails';

        return Scaffold(
          appBar: AppBar(
            title: const Text('QR Code'),
          ),
          body: Center(
            child: 
            QrImageView(
              data: qrData,
              version: QrVersions.auto,
              size: 250.0,
              gapless: false,
            ),
          ),
        );
      },
    );
  }

  Future<List<Event>> _fetchUpcomingEvents(String userId) async {
    final firestore = FirebaseFirestore.instance;
    final userDoc = await firestore.collection('Users').doc(userId).get();
    final joinedEventsId = List<String>.from(userDoc['joinedEventsId'] ?? []);

    if (joinedEventsId.isEmpty) {
      return [];
    }

    final now = DateTime.now();
    final oneWeekFromNow = now.add(const Duration(days: 7));

    final eventsSnapshot = await firestore
        .collection('events')
        .where(FieldPath.documentId, whereIn: joinedEventsId)
        .where('eventDate', isGreaterThanOrEqualTo: now.toIso8601String())
        .where('eventDate', isLessThanOrEqualTo: oneWeekFromNow.toIso8601String())
        .get();

    return eventsSnapshot.docs.map((doc) => Event.fromFirestore(doc)).toList();
  }
}

