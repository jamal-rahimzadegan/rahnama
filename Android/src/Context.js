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
} from "../assets/styles/GlobalStyle";

export const Context = React.createContext();

export function ContextProvider(props) {
    //------City + Area----------------------------------------------------------
    const [cities, setCities] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [areas, setAreas] = useState([]);
    const [areaData, setAreaData] = useState([]);
    //------app Version----------------------------------------------------------
    const [appVersion, setAppVersion] = useState('');
    const [updateLink, setUpdateLink] = useState('https://rahnama.com/');
    const [isShowUpdate, setUpdateModalVisibility] = useState(false);
    //------token----------------------------------------------------------
    const [token, setToken] = useState('');
    //------theme----------------------------------------------------------
    const [theme, setTheme] = useState('');
    //------Drawer----------------------------------------------------------
    const [drawerState, setDrawerState] = useState(false);
    //------Internet----------------------------------------------------------
    const [isHasInternet, setInternetState] = useState(true);
    //------Cats----------------------------------------------------------
    const [categories, setCategories] = useState([]);
    //------offices----------------------------------------------------------
    const [offices, setOffices] = useState([]);
    //------Functions----------------------------------------------------------
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
                //-----Cities + Areas-----------------------------------------------------------------------
                cities, setCities, cityData, setCityData,
                areas, setAreas, areaData, setAreaData,
                //-----token-----------------------------------------------------------------------
                token, setToken,
                //-----offices-----------------------------------------------------------------------
                offices, setOffices,
                //-----categories-----------------------------------------------------------------------
                categories, setCategories,
                //-----app Version-----------------------------------------------------------------------
                appVersion, setAppVersion, isShowUpdate, setUpdateModalVisibility, updateLink, setUpdateLink,
                //-----Drawer-----------------------------------------------------------------------
                drawerState, setDrawerState,
            }}>
            {props.children}
        </Context.Provider>
    );

    //------get token-----------------------------------------------------------
    function getToken() {
        SInfo.getItem('@TOKEN', {}).then((token) => {
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