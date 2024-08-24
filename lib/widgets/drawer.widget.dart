import 'package:eventy/pages/account.page.dart';
import 'package:flutter/material.dart';

class DrawerWidget extends StatelessWidget {
  const DrawerWidget({super.key});
  Widget buildListTiile(String title, IconData icon, Function onTapFunc) =>
      ListTile(
        leading: Icon(icon),
        title: Text(title),
        onTap: onTapFunc as GestureTapCallback,
      );
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Scaffold(
          appBar: AppBar(
            title: const Text(
              "The drawer",
              style: TextStyle(color: Colors.white),
            ),
            backgroundColor: Theme.of(context).primaryColor,
          ),
          body: Column(
            children: [
              buildListTiile(
                'Explore',
                Icons.card_travel,
                () => Navigator.of(context).pushReplacementNamed('/'),
              ),
              buildListTiile(
                'Account',
                Icons.filter_alt,
                () => Navigator.of(context)
                    .pushReplacementNamed(AccountPage.accountPageRoute),
              ),
            ],
          )),
    );
  }
}
