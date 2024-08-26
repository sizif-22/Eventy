import 'sighInWithGoogleBTN.dart';
import 'package:flutter/material.dart';
import '../widgets/my_button.dart';
import '../widgets/my_textfield.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../models/user.dart';

class RegisterPage extends StatefulWidget {
  final Function()? witchOne;
  RegisterPage({super.key, required this.witchOne});
  // static const registerRoute = '/registerPage';

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  // text editing controllers
  final fullnameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();
  bool error = false;

  // final _auth = FirebaseAuth.instance;
  void signUserIn() async {
    showDialog(
        context: context,
        builder: (context) => const Center(
              child: CircularProgressIndicator(),
            ));
    try {
      if (passwordController.text == confirmPasswordController.text) {
        final firebaseUser =
            await FirebaseAuth.instance.createUserWithEmailAndPassword(
          email: emailController.text,
          password: passwordController.text,
        );
        final userId = firebaseUser.user?.uid;
        UserModel user = new UserModel(
            email: emailController.text, fullName: fullnameController.text,userId: userId);
        if (userId != null) {
          user.addUser();
        }
      } else {
        setState(() {
          error = true;
        });
      }
      // Navigator.pop(context);
    } on FirebaseAuthException catch (e) {
      print(e);
      // Alert ↓↓
      // somethingwentWrong();
    }
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Image.asset(
                  'imgs/eventy.png',
                  height: 100,
                ),
                Center(
                  child: Text(
                    'hi there',
                    style: TextStyle(
                      color: Colors.grey[700],
                      fontSize: 16,
                    ),
                  ),
                ),

                const SizedBox(height: 25),

                error
                    ? const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 25.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Text(
                              "Something went wrong...",
                              style: TextStyle(
                                color: Colors.red,
                              ),
                            ),
                          ],
                        ),
                      )
                    : const SizedBox(),
                // email textfield
                MyTextField(
                  isEmail: true,
                  hintText: 'Full Name',
                  controller: fullnameController,
                  obscureText: false,
                ),
                const SizedBox(height: 10),
                MyTextField(
                  isEmail: true,
                  hintText: 'Email',
                  controller: emailController,
                  obscureText: false,
                ),

                const SizedBox(height: 10),

                // password textfield
                MyTextField(
                  isEmail: false,
                  controller: passwordController,
                  hintText: 'Password',
                  obscureText: true,
                ),
                const SizedBox(height: 10),
                MyTextField(
                  isEmail: false,
                  controller: confirmPasswordController,
                  hintText: 'Confirm Password',
                  obscureText: true,
                ),

                const SizedBox(height: 25),

                // sign in button
                MyButton(
                  onTap: signUserIn,
                  btnText: "Sign Up",
                ),

                const SizedBox(height: 50),

                // or continue with
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: Row(
                    children: [
                      Expanded(
                        child: Divider(
                          thickness: 0.5,
                          color: Colors.grey[400],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10.0),
                        child: Text(
                          'Or continue with',
                          style: TextStyle(color: Colors.grey[700]),
                        ),
                      ),
                      Expanded(
                        child: Divider(
                          thickness: 0.5,
                          color: Colors.grey[400],
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 30),

                // google + apple sign in buttons
                const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // google button
                    SignInWithGoogleBTN(),
                    SizedBox(width: 20),

                    // apple button
                    // SquareTile(imagePath: 'lib/images/apple.png')
                  ],
                ),

                const SizedBox(height: 40),

                // not a member? register now
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Already have an account?',
                      style: TextStyle(color: Colors.grey[700]),
                    ),
                    const SizedBox(width: 4),
                    GestureDetector(
                      onTap: widget.witchOne,
                      child: const Text(
                        'login now',
                        style: TextStyle(
                          color: Colors.blue,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  void somethingwentWrong() {
    showDialog(
        context: context,
        builder: (context) {
          return const AlertDialog(
            title: Text('something went wrong...'),
          );
        });
  }
}
