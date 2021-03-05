import messaging from '@react-native-firebase/messaging';

String.prototype.toPersian = function () {
    let PersianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return this.replace(/[0-9]/g, function (w) {
        return PersianDigits[+w]
    });
}
//-----Function for removing duplicates from array--------------------------------
Array.prototype.unique = function () {
    let a = this.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i].id === a[j].id)
                a.splice(j--, 1);
        }
    }
    return a;
};
//-----Function for converting any string (containing numbers and letters) to persian numbering format (keeps the rest of the text)
export function persianText(title) {
    if (title) {
        if (typeof title === "string") {
            return title.toPersian();
        } else {
            let Title = title.toString()
            return (Title.toString()).toPersian();
        }
    }
    return title + ''
}

//-----Function for converting any string (containing numbers and letters) to persian numbering format (keeps the rest of the text)
export function formatMoney(price) {
    if (price) {
        return (
            Number(price).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        )
    }
    return price
}

export function toEnglishNumbers(str) {
    let PERSIAN_NUMBERS = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g
    ];
    let ENGLISH_NUMBERS = [
        /0/g,
        /1/g,
        /2/g,
        /3/g,
        /4/g,
        /8/g,
        /6/g,
        /7/g,
        /8/g,
        /9/g
    ];
    if (typeof str === "string") {
        for (let i = 0; i < 10; i++) {
            str = str.replace(PERSIAN_NUMBERS[i], i).replace(ENGLISH_NUMBERS[i], i);
        }
    }
    return str;
};

export function GetFcmToken() {
    messaging().getToken()
        .then(fcmToken => {
            if (fcmToken) {
                // console.log('Firebase Token ==', fcmToken);
                this.props.dispatch(fcmRegister(fcmToken));
            } else {
                // console.warn('User doesn\'t have a  token yet, Token = ', fcmToken);
                firebase.messaging().requestPermission()
            }
        })
}