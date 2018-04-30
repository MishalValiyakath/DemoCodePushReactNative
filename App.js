
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AppRegistry
} from 'react-native';

import codePush from 'react-native-code-push';

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL

};

 class App extends Component {

  constructor(props) {
    super(props);
    this.updateDevEnv = this.updateDevEnv.bind(this);
    this.state = { logs: [] };
  }
   updateDevEnv() {  
     this.setState({logs : ['Started at ' + new Date().getDate()]});     
    codePush.sync({      
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
      deploymentKey: "qrtRa7u-nORN_VQAyZtUGAk8rP6PB17U2546z"
    }, (status) => {
      for(var key in codePush.SyncStatus){
        if(status === codePush.SyncStatus[key]){
          this.setState(prevState => ({ logs: [...prevState.logs, key.replace(/_/g, ' ')]}));
        }
      }
    });
  }


  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.codePush}>Demo - Code Push And Distribute Updated</Text>
        <TouchableOpacity onPress={ () => this.updateDevEnv() }
          style={styles.button}>
          <Text> Connect To Dev </Text>
        </TouchableOpacity >
        <View>
        <TouchableOpacity
          style={styles.button}>
          <Text> Connect To SIT </Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity
          style={styles.button}>
          <Text> Connect To UAT </Text>
        </TouchableOpacity>
        </View>
        <View>
          {this.state.logs.map((log, i)=> <Text> {log} </Text>)}
        </View>
       </View>
     )
   }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
      margin: 10
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      margin: 5
    },
    codePush:
    {
      fontSize: 25,
      textAlign: 'center',
      margin: 10
    }
  })
  App = codePush(codePushOptions)(App);
  export default App;
