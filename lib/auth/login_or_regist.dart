import 'login.page.dart';
import 'register.page.dart';
import 'package:flutter/material.dart';

class LoginOrRegister extends StatefulWidget {
  const LoginOrRegister({super.key});

  @override
  State<LoginOrRegister> createState() => _LoginOrRegisterState();
}

class _LoginOrRegisterState extends State<LoginOrRegister> {
  bool showLoginPge = true;
  void togglepages() {
    setState(() {
      showLoginPge = !showLoginPge;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (showLoginPge) {
      return LoginPage(
        witchOne: togglepages,
      );
    } else {
      return RegisterPage(
        witchOne: togglepages,
      );
    }
  }
}
