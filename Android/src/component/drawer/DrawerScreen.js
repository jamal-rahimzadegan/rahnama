import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Linking, Share
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../../assets/styles/DrawerScreen';
import SInfo from 'react-native-sensitive-info';
import ContactUsModal from "../modals/ContactUsModal";
import AboutUsModal from "../modals/AboutUsModal";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/FontAwesome";
import Icon4 from "react-native-vector-icons/Ionicons";
import Icon5 from "react-native-vector-icons/MaterialCommunityIcons";
import {Context} from "../../context/Context";
import ThemeModal from "../modals/ThemeModal";

export default class DrawerScreen extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            city: '',
            PostIId: '',
            signed_in: false,
            fave_posts: null,
            sign_out_bool: false,
            contact_us: false,
            about_us: false,
            notifications_bool: false,
            _first_name: '',
            all_subjects: false,
            ThemeModal: false,
            categories: [],
        };
    }

    handleSharedPost = postUrl => {
        if (postUrl.includes('https://www.rahnama.com/item/')) {
            let PostId = postUrl.substring(postUrl.lastIndexOf("/") + 1)
            if (PostId) {
                this.setState({PostIId: PostId})
                setTimeout(() => {
                    this.props.navigation.navigate('PostDetails', {postId: PostId})
                }, 1000)
            }
        }
    };

    componentDidUpdate(prevProps) {
        const isDrawerOpen = this.props.navigation.state.isDrawerOpen;
        const wasDrawerOpen = prevProps.navigation.state.isDrawerOpen;
        if (!wasDrawerOpen && isDrawerOpen) {
            this.context.setDrawerState(true)
        } else if (wasDrawerOpen && !isDrawerOpen) {
            this.context.setDrawerState(false)
        }
    }

    componentDidMount() {
        //---- If the app is not already open:
        setTimeout(() => {
            Linking.getInitialURL().then((post) => post ? this.handleSharedPost(post) : null)
        }, 2500)
        //---- If the app is already open--------------------------------------------------
        Linking.addEventListener('url', (post) => this.handleSharedPost(post.url));
    }

    render() {
        return (
            <View style={[styles.view_main, {backgroundColor: this.context.BG_COLOR}]}>
                {/*------Top Image bar---------------------------------------------------------*/}
                <ImageBackground blurRadius={.8} style={styles.img_background}
                                 source={require('../../assets/img/red_background.png')}>
                    <Image style={styles.arm_style} source={require('../../assets/img/arm.png')}/>
                    <Text style={styles.welcomeTxt}>اولین رسانه نیازمندی ایران</Text>
                    {this.context.token ? null :
                        <TouchableOpacity activeOpacity={0.7} style={[styles.LoaginBtn,{backgroundColor: this.context.BTN_COLOR}]}
                                          onPress={this.navigateToScreen('Authentication')}>
                            <Text style={[styles.login,{color: this.context.FONT_COLOR}]}>ورود به حساب کاربری</Text>
                        </TouchableOpacity>
                    }
                </ImageBackground>
                {/*------Drawer Btns---------------------------------------------------------*/}
                <ScrollView>
                    {/*------Profile---------------------------------------------------------*/}
                    {this.context.token ? (
                        <TouchableOpacity style={styles.EachBtn}
                                          onPress={this.navigateToScreen('Profile')}>
                            <Text style={[styles.texts_style, {color: this.context.FONT_COLOR}]}>حساب کاربری</Text>
                            <Icon3 name={'user'} color={this.context.FONT_COLOR} size={30}/>
                        </TouchableOpacity>
                    ) : null}
                    {/*-------Inbox messages-------------------------------------------------*/}
                    {this.context.token ?
                        <TouchableOpacity style={styles.EachBtn}
                                          onPress={this.navigateToScreen('Chats')}>
                            <Text style={[styles.texts_style, {color: this.context.FONT_COLOR}]}>گفتگوها</Text>
                            <Icon2 name={'chat'} color={this.context.FONT_COLOR} size={27}/>
                        </TouchableOpacity>
                        : null}
                    {/*-------Offers-------------------------------------------------*/}
                    {/*{this.context.token ?*/}
                    {/*    <TouchableOpacity style={styles.EachBtn}*/}
                    {/*        onPress={this.navigateToScreen('Offers')}>*/}
                    {/*        <Text style={[styles.texts_style,{color: this.context.FONT_COLOR}]}>پیشنهادات قیمت</Text>*/}
                    {/*        <Icon3 name={'hand-holding-usd'} color={this.context.FONT_COLOR} size={27}/>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*    : null}*/}
                    {/*-------magazine-------------------------------------------------*/}
                    <TouchableOpacity style={styles.EachBtn}
                                      onPress={() => Linking.openURL("http://mag.rahnama.com/")}>
                        <Text style={[styles.texts_style, {color: this.context.FONT_COLOR}]}>مجلات</Text>
                        <Icon5 name={'newspaper'} color={this.context.FONT_COLOR} size={27}/>
                    </TouchableOpacity>
                    {/*-------Prices-------------------------------------------------*/}
                    <TouchableOpacity style={styles.EachBtn}
                                      onPress={() => Linking.openURL("https://rahnama.com/guest/page/6/prices")}>
                        <Text style={[styles.texts_style, {color: this.context.FONT_COLOR}]}>تعرفه ها</Text>
                        <Icon2 name={'price-tag'} color={this.context.FONT_COLOR} size={27}/>
                    </TouchableOpacity>
                    {/*-------theme (dark/light)-------------------------------------------------*/}
                    <TouchableOpacity style={styles.EachBtn} onPress={() => this.setState({ThemeModal: true})}>
                        <Text style={[styles.texts_style, {color: this.context.FONT_COLOR}]}>حالت شب</Text>
                        <Icon2 name={'light-bulb'} color={this.context.FONT_COLOR} size={27}/>
                    </TouchableOpacity>
                    {/*-------contact_us-------------------------------------------------*/}
                    <TouchableOpacity style={styles.EachBtn} onPress={() => this.setState({contact_us: true})}>
                        <Text style={[styles.texts_style, {color: this.context.FONT_COLOR}]}>ارتباط با ما</Text>
                        <Icon4 name={'md-contacts'} color={this.context.FONT_COLOR} size={29}/>
                    </TouchableOpacity>
                    {/*-------about_us-------------------------------------------------*/}
                    <TouchableOpacity style={styles.EachBtn}
                                      onPress={() => this.setState({about_us: true})}>
                        <Text style={[styles.texts_style, {color: this.context.FONT_COLOR}]}>درباره راهنما</Text>
                        <Icon5 name={'information'} color={this.context.FONT_COLOR} size={29}/>
                    </TouchableOpacity>
                    {/*-------lists of the Offices-------------------------------------------------*/}
                    <TouchableOpacity style={styles.EachBtn}
                                      onPress={this.navigateToScreen('Offices')}>
                        <Text style={[styles.texts_style, {color: this.context.FONT_COLOR}]}>دفاتر قبول آگهی</Text>
                        <Icon3 name={'building'} color={this.context.FONT_COLOR} size={27}/>
                    </TouchableOpacity>
                    {/*-------Invite -------------------------------------------------*/}
                    <TouchableOpacity style={styles.EachBtn} onPress={() => {
                        let shareText = "نیازمندی های همشهری\n\https://www.rahnama.com"
                        Share.share({message: shareText})
                    }}>
                        <Text style={[styles.texts_style, {color: this.context.FONT_COLOR}]}>معرفی به دوستان</Text>
                        <Icon2 name={'slideshare'} color={this.context.FONT_COLOR} size={27}/>
                    </TouchableOpacity>
                    {/*-------signOut-------------------------------------------------*/}
                    {this.context.token ?
                        <TouchableOpacity style={styles.EachBtn} onPress={this.signOut.bind(this)}>
                            <Text style={[styles.texts_style, {color: this.context.FONT_COLOR}]}>خروج از حساب
                                کاربری</Text>
                            <Icon4 name={'ios-exit'} color={this.context.FONT_COLOR} size={29}/>
                        </TouchableOpacity> : null}
                </ScrollView>
                <Text
                    style={[styles.VersionTXT, {color: this.context.FONT_COLOR}]}> نسخه: {this.context.appVersion} </Text>
                {/*------Contact us modal-------------------------------------------------------------------------------*/}
                <ContactUsModal Visible={this.state.contact_us} Close={() => this.setState({contact_us: false})}/>
                {/*------Theme Modal -----------------------------------------------------------------------------------*/}
                <ThemeModal navigation={this.props.navigation} Visible={this.state.ThemeModal}
                            Close={() => this.setState({ThemeModal: false})}/>
                {/*------about_us modal ------------------------------------------------------------*/}
                <AboutUsModal Visible={this.state.about_us} Close={() => this.setState({about_us: false})}/>
            </View>
        );
    }

    navigateToScreen = route => () => {
        this.props.navigation.closeDrawer()
        this.props.navigation.navigate(route)

    };

    signOut = async () => {
        try {
            await SInfo.setItem('@TOKEN', '', {});
            this.context.setToken('')
            AsyncStorage.removeItem('@PHONE');
            this.setState({
                _first_name: '',
                _last_name: '',
                _credit: 0,
            });
            this.props.navigation.closeDrawer();
            this.setState({sign_out_bool: true});
        } catch (e) {
        }
    };
}