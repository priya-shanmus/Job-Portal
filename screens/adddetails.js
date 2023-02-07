import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';

import * as Font from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class AddDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      dropdownHeight: 40,
      name: '',
      age: '',
      qualification: '',
      address: '',
      number: '',
      experience: '',
      gender:"",
     
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  addjobdetails=()=>{
    console.log(this.state.name)
    if (
      this.state.name &&
      this.state.gender&&
      this.state.age &&
      this.state.qualification &&
      this.state.experience &&
      this.state.number &&
      this.state.address
    ) {
      var d = new Date();
      let jobData = {
        name: this.state.name,
        age: this.state.age,
        qualification: this.state.qualification,
        experience: this.state.experience,
        number: this.state.number,
        address: this.state.address,
gender:this.state.gender,
        created_on: d.toString(),
        author_uid: firebase.auth().currentUser.uid,
      };
      console.log(jobData);
       firebase
        .database()
        .ref('/posts/' + Math.random().toString(36).slice(2))
        .set(jobData)
         .then(function (snapshot) {

        })

      this.props.setUpdateToTrue();
      this.props.navigation.navigate('Details');
      this.setState({name:'',gender:"",age:"",qualification:"",experience:"",number:"",address:""})
    } else {
      alert(
        'Error',
        'All fields are required!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }
  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
 let gen = {
        male:"male",
        female:"female",
        others:"others"
      }
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View>
            <Text style = {{color:"white", fontStyle:"bold", fontSize:25}}> Add Your Details Here  </Text>
          </View>
          <ScrollView>
            <TextInput
              style={styles.inputFont}
              onChangeText={name => this.setState({ name:name })}
              placeholder={' Name'}
              placeholderTextColor="white"
              value = {this.state.name }
            />
            <Text style = {{color:"white",fontSize:20}}>GENDER : { this.state.gender }</Text>
            <DropDownPicker 
             items={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "others", value: "others" },
                
                ]}
            defaultValue={this.state.gender}
                open={this.state.dropdownHeight == 170 ? true : false}
                onOpen={() => {
                  this.setState({ dropdownHeight: 170 });
                }}
                onClose={() => {
                  this.setState({ dropdownHeight: 40 });
                }}
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "white",
                }}
                textStyle={{
                  color: this.state.dropdownHeight == 170 ? "black" : "white",
                  fontFamily: "Bubblegum-Sans",
                }}
                onSelectItem={(item) =>
                  this.setState({
                    gender: item.value,
                  })
                }/>
            <TextInput
              style={styles.inputFont}
              onChangeText={age=> this.setState({ age: age })}
              placeholder={'Age'}
              placeholderTextColor="white"
               value = {this.state.age }
            />

            <TextInput
              style={styles.inputFont}
              onChangeText={qual=> this.setState({ qualification: qual })}
              placeholder={'Maximum qualification'}
              placeholderTextColor="white"
               value = {this.state.qualification }
            />
            <TextInput
              style={styles.inputFont}
              onChangeText={exp => this.setState({ experience: exp })}
              placeholder={' Experience'}
              placeholderTextColor="white"
               value = {this.state.experience}
            />
            <TextInput
              style={styles.inputFont}
              onChangeText={number => this.setState({ number: number })}
              placeholder={'Contact number'}
              placeholderTextColor="white"
               value = {this.state.number }
            />
            <TextInput
              style={styles.inputFont}
              onChangeText={add => this.setState({ address: add })}
              placeholder={'Address'}
              placeholderTextColor="white"
              multiline={true}
              numberOfLines={6}
               value = {this.state.address }
            />
            <TouchableOpacity
              onPress={this.addjobdetails}
              style={styles.submitButtonLiked}>
              <Text>SUBMIT</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={{ flex: 0.08,backgroundColor:"#15193c"}} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: '#15193c',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  inputFont: {
    height: RFValue(40),
    marginTop: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
  submitButtonLiked: {
    flexDirection: 'row',
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
    marginTop:20,
    alignSelf:"center"

  },
});
