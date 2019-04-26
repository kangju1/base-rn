import React from 'react';
import {Easing, Animated, SafeAreaView} from 'react-native';
import {createStackNavigator, createMaterialTopTabNavigator, createAppContainer, MaterialTopTabBar} from 'react-navigation';
import StackViewStyleInterpolator from  'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import Splash from "../pages/Splash";


function SafeAreaMaterialTopTabBar (props) {
    return (
        <SafeAreaView>
            <MaterialTopTabBar {...props} />
        </SafeAreaView>
    )
}

const TabNavigator = createMaterialTopTabNavigator({
    Search: {
        screen: Splash,
        navigationOptions: {
            title: '탭1',
        }
    },
    Config: {
        screen: Splash,
        navigationOptions: {
            title: '탭2',
        }
    },
}, {
    lazy: true,
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
        showIcon: true,
        showLabel: true,
        activeTintColor: '#000',
        inactiveTintColor: '#666',
        style: {
            backgroundColor: '#fff',
        },
        iconStyle: {
            justifyContent: 'flex-start',
        },
        labelStyle: {
            marginTop: 5,
            marginBottom: 0,
        }
    },
    tabBarComponent: SafeAreaMaterialTopTabBar,
    navigationOptions: {
        header: null,
    }
});


const StackNavigator = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: {
            title: '메뉴렛'
        }
    },
},{
    initialRouteName: 'Splash',
    transitionConfig: (navigation) => {
        return {
            transitionSpec: {
                duration: 500,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
                useNativeDriver: true,
            },
            screenInterpolator: (screenProps) => {
                return StackViewStyleInterpolator.forHorizontal(screenProps)
            }
        }
    },
    headerLayoutPreset: 'center',
});


export default createAppContainer(StackNavigator)