import React, {Component} from "react";
import {BackHandler, Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import styles from "../../assets/styles/Offers";
import SInfo from 'react-native-sensitive-info';
import InternetModal from "../modals/InternetModal";
import {RedMed} from "../../assets/styles/GlobalStyle";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import {persianText, formatMoney} from "../../statics/functions";
import LoadingLogo from "../../statics/LoadingLogo";
import PostRequest from "../../statics/connection";
import {Context} from "../../context/Context";
import NotifyModal from "../modals/NotifyModal";

export default class Offers extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.navigate = this.props.navigation.navigate;
        this.state = {
            data: [],
            ind_off: true
        };
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick.bind(this));;
        this.getOffers(this.context.token);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={RedMed} barStyle={'light-content'}/>
                <View style={styles.header}>
                    <View/>
                    <Text style={styles.head_text}>پیشنهادات من</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon2 name="navigate-next" size={40} color="#fff"/>
                    </TouchableOpacity>
                </View>
                {/*----------List Body---------------------------------------------*/}
                <ScrollView>
                    {this.state.data.length > 0 ? (
                        this.state.data.map((item, index) => {
                            return (
                                <View>
                                    <Text style={styles.top_txt}> • این قسمت مربوط به پیشنهادات ارائه شده به دیگران می
                                        باشد.</Text>
                                    {/*----------List Header---------------------------------------------*/}
                                    <View style={styles.OffersListHeader}>
                                        <View style={styles.EachItemContainer}>
                                            <Text style={styles.top_txt}>ردیف</Text>
                                        </View>
                                        <View style={styles.EachItemContainer}>
                                            <Text style={styles.top_txt}>عنوان آگهی</Text>
                                        </View>
                                        <View style={styles.EachItemContainer}>
                                            <Text style={styles.tedad}>تعداد پیشنهادات</Text>
                                        </View>
                                        <View style={styles.EachItemContainer}>
                                            <Text style={styles.top_txt}>قیمت</Text>
                                        </View>
                                    </View>
                                    <View style={styles.PricesSeperator}/>
                                    <TouchableOpacity
                                        style={styles.EachOfferContainer}
                                        activeOpacity={0.5}
                                        onPress={() => this.props.navigation.navigate("PostOffers", {post_id: item.id})}>
                                        <View style={styles.EachItemContainer}>
                                            <Image style={styles.img} source={require("../../assets/img/user.png")}/>
                                        </View>
                                        <View style={styles.EachItemContainer}>
                                            <Text style={styles.megdar}>{item.title}</Text>
                                        </View>
                                        <View style={styles.EachItemContainer}>
                                            <Text style={styles.megdar}>
                                                {persianText(item.offers)}
                                            </Text>
                                        </View>
                                        <View style={styles.EachItemContainer}>
                                            <Text style={styles.pricee}>
                                                {formatMoney(item.price)}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    ) : this.state.ind_off ?
                        <LoadingLogo Height={70} Width={70}/> :
                        <Text style={styles.no_pm}>پیشنهادی وجود ندارد</Text>
                    }
                </ScrollView>
                <NotifyModal Visible={this.state.net_error} Body={'خطا در ارتباط اینترنتی لطفا دوباره تلاش کنید'}
                             Close={() => this.setState({net_error: false})}/>
            </View>
        );
    }


    getOffers = token => {
        NetInfo.fetch().then(state => {
            if (state.isInternetReachable) {
                this.setState({net_error: false});
                let formdata = new FormData();
                formdata.append("token", token);
                PostRequest("getOffers", formdata)
                    .then(response => {
                        if (response) {
                            this.setState({data: response.data, ind_off: false});
                        } else {
                        }
                    }).catch((e) => {
                    this.setState({data: [], ind_off: false});
                });
            } else {
                this.setState({net_error: true});
            }
        });
    };
}


