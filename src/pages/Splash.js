import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {create} from "apisauce";
import Moment from 'moment';

export default class Splash extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.api = create({baseURL: 'https://facebook.com'});
        this.api.get('ping').then(res=>{console.log(res)}).catch(err=>{console.log(err)})
    }

    render(){
        return (
            <View>
                <Text>Hello everyone!</Text>
            </View>
        )
    }
}