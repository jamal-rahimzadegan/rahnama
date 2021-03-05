const StackNavigator = createStackNavigator({
    SplashScreen: {screen: SplashScreen},
    Level4: {screen: Level4},
    Search: {screen: Search},
    Upgrade: {screen: Upgrade},
    Level1: {screen: Level1},
    Level3: {screen: Level3},
    Chats: {screen: Chats}, // chat list
    Offices: {screen: Offices},
    Offers: {screen: Offers}, // Price offers
}, {
    headerMode: 'none',
    transitionConfig: NavigationTransition,
});

const DrawerNavigator = createDrawerNavigator({
        StackNavigator: {screen: StackNavigator}
    },
    {
        contentComponent: ({navigation}) => <DrawerScreen navigation={navigation}/>,
        drawerWidth: 270,
        overlayColor: DIM_BG,
        sceneContainerStyle: {backgroundColor: 'red'},
        drawerBackgroundColor: 'transparent',
        drawerPosition: 'right',
    },
);

const Drawer = createAppContainer(DrawerNavigator);
export default Drawer;
