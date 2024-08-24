// import 'package:eventy/widgets/drawer.widget.dart';
import 'package:flutter/material.dart';

class QrCodePage extends StatelessWidget {
  const QrCodePage({super.key});
  static const qrCodeRoute = '/qrcode';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Qr code'),
      ),
      // drawer: const DrawerWidget(),
      body: const Center(
        child: Text('QrCode page'),
      ),
    );
  }
}
