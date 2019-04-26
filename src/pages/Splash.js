import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image, TextInput, TouchableOpacity} from 'react-native';
import {create} from "apisauce";
import Moment from 'moment';
import {Formik} from 'formik';
import * as yup from 'yup';

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
                            .when(['isA', 'isB'], {is: (isSale, isRent)=>!isSale && !isRent, then: s=>s.oneOf([true], 'Please select a type')}),
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
                            <View style={{padding: 20, backgroundColor: '#fff', height: 250, marginTop: 20}}>
                                <TextInput
                                    multiline={true}
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
                                <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        )
    }
}