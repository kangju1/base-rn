import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, PermissionsAndroid, Platform} from 'react-native';
import {create} from "apisauce";
import Moment from 'moment';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Toast} from "native-base";
import geolocation from 'react-native-geolocation-service';

export default class Splash extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.api = create({baseURL: 'https://facebook.com'});
        this.api.get('ping').then(res=>{console.log(res)}).catch(err=>{console.log(err)})
    }

    onSubmit(values, resetForm){
        console.log(values);
        resetForm()
    }

    async getAndroidCurrentLocation(callback) {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                geolocation.getCurrentPosition((position)=>{
                    this.myCoord = position.coords;
                    callback()
                },(error)=>{
                    console.log(error);
                    if(error.code === 5) {
                        Toast.show({text: 'Retry and press ok', position: 'top', textStyle: {textAlign: 'center'}})
                    }else {
                        Toast.show({text: 'Turn off the gps and retry', position: 'top', textStyle: {textAlign: 'center'}})
                    }
                },{ enableHighAccuracy: true, timeout: 5000, maximumAge: 7000})
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    async getIosCurrentLocation(callback){
        geolocation.getCurrentPosition((position)=>{
            this.myCoord = position.coords;
            callback()
        },(error)=>{
            console.log(error);
            if(error.code === 1) {
                Toast.show({text: 'Please allow location usage in the setting', position: 'top', textStyle: {textAlign: 'center'}})
            } else if(error.code === 5) {
                Toast.show({text: 'Retry and press ok', position: 'top', textStyle: {textAlign: 'center'}})
            }else {
                Toast.show({text: 'Unknown issue.', position: 'top', textStyle: {textAlign: 'center'}})
            }
            this.setState({isRequesting: false})
        },{ enableHighAccuracy: true, timeout: 10000, maximumAge: 7000})
    }

    getLocation(){
        let callback = () => Toast.show({text: 'Got my location', position: 'top', textStyle: {textAlign: 'center'}});
        if(Platform.OS === 'ios'){
            this.getIosCurrentLocation(callback);
        }else{
            this.getAndroidCurrentLocation(callback);
        }
    }

    render(){
        return (
            <View>
                <Formik
                    enableReinitialize
                    initialValues={{ name: '', a: '', b: '', c: '', isA: false, isB: false, isC: false, category: {}}}
                    onSubmit={(values, {resetForm}) => this.onSubmit(values, resetForm)}
                    validationSchema={yup.object().shape({
                        category: yup
                            .object()
                            .shape({id: yup.string().required('Please Select category')}),
                        isAd: yup
                            .boolean()
                            .when(['isA', 'isB'], {is: (isA, isB)=>!isA && !isB, then: s=>s.oneOf([true], 'Please select a type')}),
                        name: yup
                            .string()
                            .max(30, 'Maximum of 30 characters.')
                            .required('Required'),
                        a: yup
                            .string()
                            .when('isA', {is: true, then: s=>s.required('Required')}),
                        b: yup
                            .string()
                            .when('isB', {is: true, then: s=>s.required('Required')}),
                        c: yup
                            .string()
                            .when('isC', {is: true, then: s=>s.required('Required')}),
                    })}>
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, setFieldValue, resetForm }) => (
                        <View>
                            <View style={{padding: 20, backgroundColor: '#fff', marginTop: 20}}>
                                <TextInput
                                    style={{fontSize: 18, textAlignVertical: 'top'}}
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                    placeholder="Detail description"
                                    onBlur={() => setFieldTouched('description')}
                                />
                            </View>
                            {touched.description && errors.description &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.description}</Text>}
                            <TouchableOpacity
                                onPress={isValid ? handleSubmit : null}
                                style={{backgroundColor:  isValid ?'#4682B4' : '#666', paddingVertical: 20, marginTop: 20}}>
                                <Text style={{textAlign: 'center', color: '#fff'}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>

                <TouchableOpacity
                    onPress={this.getLocation.bind(this)}
                    style={{backgroundColor: '#00688B', paddingVertical: 20, marginTop: 20}}>
                    <Text style={{textAlign: 'center', color: '#fff'}}>Location Check</Text>
                </TouchableOpacity>
            </View>
        )
    }
}