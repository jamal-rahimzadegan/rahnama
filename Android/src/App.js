import React, {Component} from "react";
import {View, Text} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import messaging from '@react-native-firebase/messaging';
import NotifyModal from "./components/modals/NotifyModal";
import InternetModal from "./components/modals/InternetModal";
import Drawer from "./navigating/Routes";
import {ContextProvider} from "./context/Context";
import codePush from 'react-native-code-push'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_time: true,
            backClickCount: 0,
            net_error: false,
            visible: false,
            Title: '',
            Body: '',
        };
    }

    onNotificationHandler(title, body) {
        this.setState({
            visible: !this.state.visible,
            Title: title,
            Body: body
        }, () => {
            this.forceUpdate()
        })
    }


    componentDidMount() {
        codePush.sync({
            // updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE
        });
        //-----Open a modal on NotificationOpen------------------------
        messaging().setBackgroundMessageHandler(async notif => {
            let not = notif.notification;
            this.onNotificationHandler(not.title, not.body)
        });
    }

    render() {
        return (
            <ContextProvider>
                <View style={styles.AppMain}>
                    <Drawer/>
                    <NotifyModal Visible={this.state.visible} Title={this.state.Title} Body={this.state.Body}
                                 Close={this.onNotificationHandler.bind(this)}/>
                </View>
            </ContextProvider>
        );
    }
}
let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};
export default codePush(codePushOptions)(App)

