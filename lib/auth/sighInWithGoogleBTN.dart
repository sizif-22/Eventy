import 'package:eventy/models/user.dart';
import '../widgets/square_tile.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

class SignInWithGoogleBTN extends StatelessWidget {
  const SignInWithGoogleBTN({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      child: const SquareTile(imagePath: 'imgs/google.png'),
      onTap: () async {
        showDialog(
            context: context,
            builder: (context) => const Center(
                  child: CircularProgressIndicator(),
                ));
        final _googleSignIn = GoogleSignIn();
        final googleAccount = await _googleSignIn.signIn();
        final googleCredential = await googleAccount?.authentication;
        final authCredential = GoogleAuthProvider.credential(
          idToken: googleCredential?.idToken,
          accessToken: googleCredential?.accessToken,
        );
        final firebaseUser =
            await FirebaseAuth.instance.signInWithCredential(authCredential);
        final userId = firebaseUser.user?.uid;
        final userEamil = firebaseUser.user?.email;
        final userName = firebaseUser.user?.displayName;
        final userPhotoUrl = firebaseUser.user?.photoURL;
        if (userId != null && userEamil != null && userName != null) {
          //  var userDoc = await FirebaseFirestore.instance.collection('Users').doc(userId);
          UserModel user = new UserModel(
              email: userEamil, fullName: userName, photoUrl: userPhotoUrl);
          user.addUser();
        }
        print(firebaseUser.user);
        Navigator.pop(context);
      },
    );
  }
}
