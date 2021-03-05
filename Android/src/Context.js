import React, {useState, useEffect} from 'react';
import {Appearance, AsyncStorage} from 'react-native'
import SInfo from 'react-native-sensitive-info';
import {
    DarkModeBG,
    DarkModeBtn,
    DarkModeTxt,
    Grey,
    LightModeBG,
    LightModeInpBG,
    LightModeTxt, LightSelectAbleModeBtn
} from "./GlobalStyle";

export const Context = React.createContext();

export function ContextProvider(props) {
    const [cities, setCities] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [areas, setAreas] = useState([]);
    const [areaData, setAreaData] = useState([]);
    const [appVersion, setAppVersion] = useState('');
    const [updateLink, setUpdateLink] = useState('https://rahnama.com/');
    const [isShowUpdate, setUpdateModalVisibility] = useState(false);
    const [token, setToken] = useState('');
    const [theme, setTheme] = useState('');
    const [drawerState, setDrawerState] = useState(false);
    const [isHasInternet, setInternetState] = useState(true);
    const [categories, setCategories] = useState([]);
    const [offices, setOffices] = useState([]);

    getToken()
    getInitialTheme()

    return (
        <Context.Provider
            value={{
                //-----Theme-----------------------------------------------------------------------
                BG_COLOR: theme == 'light' ? LightModeBG : DarkModeBG,
                FONT_COLOR: theme == 'light' ? LightModeTxt : DarkModeTxt,
                BTN_COLOR: theme == 'light' ? LightModeBG : DarkModeBtn,
                INP_BG: theme == 'light' ? LightModeInpBG : DarkModeBtn,
                theme, handleTheme: changeTheme,
                //-----Internet Check-----------------------------------------------------------------------
                isHasInternet,
                set_Network_is_Disconnected: () => setInternetState(false),
                set_Network_is_Connected: () => setInternetState(true),
                cities, setCities, cityData, setCityData,
                areas, setAreas, areaData, setAreaData,
                token, setToken,
                offices, setOffices,
                categories, setCategories,
                appVersion, setAppVersion, isShowUpdate, setUpdateModalVisibility, updateLink, setUpdateLink,
                drawerState, setDrawerState,
            }}>
            {props.children}
        </Context.Provider>
    );

    //------get token-----------------------------------------------------------
    function getToken() {
        SInfo.getItem('@tokenOfTheUserGoesHere', {}).then((token) => {
            setToken(token)
        })
    }

    //------get theme-----------------------------------------------------------
    function getInitialTheme() {
        AsyncStorage.getItem('theme').then((theme) => {
            theme ? (theme == 'system' ? setTheme(Appearance.getColorScheme()) : setTheme(theme)) : setTheme(Appearance.getColorScheme())
        })
    }

    //------handleTheme-----------------------------------------------------------
    function changeTheme(theme) {
        AsyncStorage.setItem('theme', theme)
        theme == 'system' ? setTheme(Appearance.getColorScheme()) : setTheme(theme)
    }
}
