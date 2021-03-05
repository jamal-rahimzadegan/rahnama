import {View, Text} from "react-native";
import styles from "../assets/styles/PostDetails";
import {DIM_BG, Grey, RedLight, RedMed} from "../assets/styles/GlobalStyle";
import React from "react";
import {persianText} from "./functions";


export default function SliderBullets(props) {
    return (
        <View style={styles.SliderBulletContainer}>
            {
                props.Photos.length > 1 ?
                    props.Photos.map((item, index) => {
                        return (
                            <View style={{
                                elevation:1,
                                backgroundColor: props.ActiveImg == index ? RedMed : 'rgba(220,220,220,.8)',
                                height:8,
                                width:8,
                                borderRadius:2.7,
                                margin: 5,
                            }}/>
                        )
                    }) : null
            }
        </View>
    )
}
