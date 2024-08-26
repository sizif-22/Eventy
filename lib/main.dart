import 'package:eventy/pages/account.page.dart';
import 'auth/auth.page.dart';
import 'package:eventy/pages/home/home_page.dart';
import 'package:eventy/pages/qrcode.page.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        // home: const AuthPage(),
        initialRoute: '/',
        theme: ThemeData(
          primarySwatch: Colors.deepPurple,
        ),
        routes: {
          '/': (ctx) => const AuthPage(),
          AccountPage.accountPageRoute: (ctx) => const AccountPage(),
          HomePage.homePageRoute: (ctx) => const HomePage(),
          QrCodePage.qrCodeRoute: (ctx) => const QrCodePage(),
          // LoginPage.loginRoute: (ctx) => LoginPage(),
          // RegisterPage.registerRoute: (ctx) => RegisterPage(),
        });
  }
}
