import React, {Component} from 'react';
import {
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Linking,
    BackHandler
} from 'react-native';
import styles from '../../assets/styles/Offices';
import Icon2 from "react-native-vector-icons/MaterialIcons";
import {RedMed} from "../../assets/styles/GlobalStyle";
import {Context} from "../../context/Context";

export default class Offices extends Component {
    static contextType = Context
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick.bind(this));;
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackButtonClick() {
        this.props.navigation.goBack()
        return true
    }


    render() {
        return (
            <View style={[styles.OfficesContainer, {}]}>
                <StatusBar backgroundColor={RedMed} barStyle={'light-content'}/>
                <View style={styles.header}>
                    <View/>
                    <Text style={styles.head_text}>دفاتر قبول آگهی</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon2 name="navigate-next" size={40} color="#fff"/>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={[styles.OfficesList, {backgroundColor: this.context.BG_COLOR}]}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderOffices.bind(this)}
                    data={this.context.offices}
                />
            </View>
        );
    }

    renderOffices(item) {
        let office = item.item;
        return (
            <TouchableOpacity style={[styles.ResellerBtn, {backgroundColor: this.context.BTN_COLOR}]}
                              onPress={() => this.goToLocation(office.lat, office.lng)}>
                <Text
                    style={[ styles.OfficesTitle]}>{office.title.search('دفتر') == 0 ? null : 'دفتر '}{office.title}</Text>
                <Text
                    style={[styles.OfficesAddress, { color: this.context.FONT_COLOR}]}>{office.address}</Text>
            </TouchableOpacity>
        );
    }

//------for opening the location of the office -------------------------------------------------------
    goToLocation(lat, lng) {
        const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
        const latLng = `${lat},${lng}`;
        const label = 'موقعیت دفتر';
        const location = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
        });
        Linking.openURL(location);
    }
}

