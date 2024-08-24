import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class AccountPage extends StatelessWidget {
  const AccountPage({super.key});
  static const accountPageRoute = '/account';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Text(FirebaseAuth.instance.currentUser?.email as String),
            InkWell(
              child: Icon(Icons.logout),
              onTap: () => FirebaseAuth.instance.signOut(),
            )
          ],
        ),
      ),
    );
  }
}
