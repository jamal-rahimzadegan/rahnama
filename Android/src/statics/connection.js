import React from 'react';
import axios from "axios";
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";


export default async function PostRequest(api, FormData) {
    return axios({method: 'post', timeout: 3000, url: Host + api, data: FormData})
    // return axios.post(Host + api, FormData, config)
}

export async function GetRequest(api) {
    return axios({method: 'get', timeout: 3000, url: Host + api, data: {}})
    // return axios.get(Host + api, {headers: {}})
}

export const Host = 'https://rahnama.com/webservice/'
export const Uploads = 'https://rahnama.com/uploads/'
const config = {
    timeout: 1,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': '*',
    }
};