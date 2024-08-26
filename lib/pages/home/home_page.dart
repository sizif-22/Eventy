import 'package:flutter/material.dart';
import '../../constant/text_style.dart';
import '../../models/event_model.dart';
import '../event_detail_page.dart';
import '../../utils/app_utils.dart';
import '../../widgets/home_bg_color.dart';
import 'nearby_event_card.dart';
import '../../widgets/ui_helper.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  static const homePageRoute = '/homePage';

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with TickerProviderStateMixin {
  late ScrollController scrollController;
  late AnimationController controller;
  late AnimationController opacityController;
  late Animation<double> opacity;

  @override
  void initState() {
    super.initState();

    scrollController = ScrollController();

    controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..forward();

    opacityController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    );

    opacity = Tween(begin: 1.0, end: 0.0).animate(CurvedAnimation(
      curve: Curves.linear,
      parent: opacityController,
    ));

    scrollController.addListener(() {
      opacityController.value = offsetToOpacity(
        currentOffset: scrollController.offset,
        maxOffset: scrollController.position.maxScrollExtent / 2,
      );
    });
  }

  @override
  void dispose() {
    controller.dispose();
    scrollController.dispose();
    opacityController.dispose();
    super.dispose();
  }

  Future<void> _refreshData() async {
    // Add your data refresh logic here, for example, fetching updated data from a server.
    print('Refreshing data...');
    setState(() {
      // Update your data here
    });
  }

  void viewEventDetail(Event event) {
    Navigator.of(context).push(
      PageRouteBuilder(
        opaque: false,
        barrierDismissible: true,
        transitionDuration: const Duration(milliseconds: 300),
        pageBuilder: (BuildContext context, animation, __) {
          return FadeTransition(
            opacity: animation,
            child: EventDetailPage(event),
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: <Widget>[
          HomeBackgroundColor(opacity),
          RefreshIndicator(
            onRefresh: _refreshData,
            child: SingleChildScrollView(
              controller: scrollController,
              padding: const EdgeInsets.only(top: 100),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  buildSearchAppBar(),
                  UIHelper.verticalSpace(16),
                  BuildUpComingEventList(),
                  UIHelper.verticalSpace(16),
                  BuildMostPopularEvents(controller: controller),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget buildSearchAppBar() {
    const inputBorder = UnderlineInputBorder(
      borderSide: BorderSide(color: Colors.white),
    );
    return const Padding(
      padding: EdgeInsets.symmetric(horizontal: 16),
      child: TextField(
        style: TextStyle(color: Colors.white),
        decoration: InputDecoration(
          hintText: "Search...",
          hintStyle: TextStyle(
              color: Colors.white, fontWeight: FontWeight.bold, fontSize: 24),
          border: inputBorder,
          enabledBorder: inputBorder,
          focusedBorder: inputBorder,
        ),
      ),
    );
  }
}
