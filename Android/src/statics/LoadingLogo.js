import React from "react";
import LottieView from "lottie-react-native";

export default function LoadingLogo(props) {
    return (
        <LottieView style={{alignSelf:'center',height: props.Height, width: props.Width}}
                    source={require('../assets/animations/Loading.json')} autoPlay loop/>
    )
}
