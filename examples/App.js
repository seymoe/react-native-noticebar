/**
 * Example
 * https://github.com/ximolang/react-native-noticebar/examples
 *
 */

import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
// import NoticeBar from './NoticeBar'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>react-native-noticebar</Text>
        <Text style={styles.instructions}>This is a example to show NoticeBar Component!</Text>
        {/* <NoticeBar></NoticeBar> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
