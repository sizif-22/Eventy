import 'package:eventy/pages/account.page.dart';
import 'package:eventy/pages/home_page.dart';
import 'package:eventy/pages/qrcode.page.dart';
import 'package:eventy/widgets/drawer.widget.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class HomePageButtonNavigationBar extends StatefulWidget {
  // final Function(int) onTap;
  const HomePageButtonNavigationBar({Key? key}) : super(key: key);

  @override
  State<HomePageButtonNavigationBar> createState() =>
      _HomePageButtonNavigationBarState();
}

class _HomePageButtonNavigationBarState
    extends State<HomePageButtonNavigationBar> {
  void _selectScreen(int index) {
    setState(() {
      _selectedSreenIndex = index;
    });
  }

  int _selectedSreenIndex = 0;
  final List<Map<String, Object>> _screens = [
    {
      'screen': const HomePage(),
      'title': 'Explore',
    },
    {
      'screen': const AccountPage(),
      'title': 'Account',
    },
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const DrawerWidget(),
      body: _screens[_selectedSreenIndex]['screen'] as Widget,
      bottomNavigationBar: BottomNavigationBar(
        onTap: _selectScreen,
        selectedItemColor: Theme.of(context).secondaryHeaderColor,
        unselectedItemColor: Colors.white,
        currentIndex: _selectedSreenIndex,
        backgroundColor: Theme.of(context).primaryColor,
        items: const [
          BottomNavigationBarItem(
            label: "Explore",
            icon: Icon(Icons.explore),
          ),
          BottomNavigationBarItem(
            label: "Account",
            icon: Icon(Icons.person),
          ),
        ],
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      floatingActionButtonAnimator: FloatingActionButtonAnimator.scaling,
      floatingActionButton: FloatingActionButton(
        onPressed: () =>
            Navigator.of(context).pushNamed(QrCodePage.qrCodeRoute),
        child: const Icon(FontAwesomeIcons.qrcode),
      ),
    );
  }
}
