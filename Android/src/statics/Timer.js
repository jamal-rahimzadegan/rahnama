import React, {useContext} from 'react';
import {StyleSheet} from 'react-native'
import CountDown from 'react-native-countdown-component';
import {Context} from "../context/Context";


export default function Test(props) {
    const context = useContext(Context)
    return (
        <CountDown
            size={30} showSeparator
            until={props.countTime}
            id={props.isReset}
            onFinish={props.onFinish}
            digitStyle={[styles.digitStyle,{backgroundColor: context.BG_COLOR}]}
            digitTxtStyle={[styles.digitTxtStyle,{color: context.FONT_COLOR}]}
            separatorStyle={[styles.separatorStyle,{color: context.FONT_COLOR}]}
            timeToShow={['M', 'S']}
            timeLabels={{m: null, s: null}}
        />
    );
}
const styles = StyleSheet.create({
    digitStyle: {backgroundColor: '#fff', height: 30, width: 30},
    digitTxtStyle: {color: '#444', fontSize: 16, fontFamily: 'BYekan', fontWeight: 'normal'},
    separatorStyle: {color: '#444', fontSize: 15,},
})
