import {Animated, Easing} from "react-native";

export const navigationTransition = () => {
    return {
        transitionSpec: {
            duration: 600,
            useNativeDriver: true,
            timing: Animated.timing,
            easing: Easing.out(Easing.poly(4)),
        },
        screenInterpolator: (transitionData) => {
            const {layout, position, scene} = transitionData;
            const transition = 'default';
            return {
                default: slideFromRight(scene.index, position, layout.initWidth)
            }[transition]
        }
    }
}
//------transitions----------------------------------------------------------------------------------
let slideFromRight = (index, position, width) => {
    const translateX = position.interpolate({
        inputRange: [index, index + 1],
        outputRange: [0, width]
    })
    return {transform: [{translateX}]}
}
