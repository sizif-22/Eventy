// File generated by FlutterFire CLI.
// ignore_for_file: type=lint
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for macos - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyCzPrayDcOxg161jYidW43u1BsMTgQzvA0',
    appId: '1:404254202391:web:040687ec67c4ee45fb9a52',
    messagingSenderId: '404254202391',
    projectId: 'm4-tazkarti',
    authDomain: 'm4-tazkarti.firebaseapp.com',
    storageBucket: 'm4-tazkarti.appspot.com',
    measurementId: 'G-C6F6W6YKZ7',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyAWT2eb-iUI5-VomLGaFWEgibDeJiWibko',
    appId: '1:404254202391:android:97dd6631ad44288efb9a52',
    messagingSenderId: '404254202391',
    projectId: 'm4-tazkarti',
    storageBucket: 'm4-tazkarti.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyDD-RTu4Aj5TKHtovG4DB_G2wXZaDCH6ds',
    appId: '1:404254202391:ios:8254238983ecb57ffb9a52',
    messagingSenderId: '404254202391',
    projectId: 'm4-tazkarti',
    storageBucket: 'm4-tazkarti.appspot.com',
    iosClientId: '404254202391-nl5s1pfl3ok1h0158ndn7nitladpnj72.apps.googleusercontent.com',
    iosBundleId: 'com.example.eventy',
  );
}
