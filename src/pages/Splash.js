import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';


export default class Splash extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <View>
                <Text>Hello everyone!</Text>
            </View>
        )
    }
}