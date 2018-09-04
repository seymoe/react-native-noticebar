/**
 * Example
 * https://github.com/ximolang/react-native-noticebar/examples
 *
 */

import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import { px2dp, fSize, ww } from './src/utils/resolution'

import NoticeBar from 'react-native-noticebar'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noticeList: [
        {
          id: 1,
          title: 'This is Notice Bar!!'
        },
        {
          id: 2,
          title: 'Notice Bar coming!!'
        }
      ]
    }
  }

  // notice bar change event
  handleChange = (index) => {
    console.log(`Current index is ${index}.` )
  }

  // notice bar press event
  handlePress = (item, index) => {
    console.log(item, index)
  }

  // render item
  renderBarItem = (item, index) => {
    return (
      <View style={styles.slide}>
        <Text numberOfLines={1} style={styles.text}>{item.title}</Text>
      </View>
    )
  }

  render() {
    let { noticeList } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>react-native-noticebar</Text>
        <Text style={styles.instructions}>This is a example to show NoticeBar Component!</Text>
        
        {/* 基本展示 */}
        <NoticeBar
          data={ noticeList }
          renderBarItem={ this.renderBarItem }
          scrollHeight={ px2dp(80) }
          scrollBarStyle={ styles.barStyle }
          delay={ 3000 }
          duration={ 500 }
          easing='linear'
          onChange={ this.handleChange }
          onPress={ this.handlePress }></NoticeBar>
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
    marginBottom: 25
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff'
  },
  barStyle: {
    backgroundColor: '#fff'
  },
  text: {
    marginLeft: px2dp(10),
    color: '#333',
    fontSize: fSize(28),
    fontWeight: 'bold',
    width: ww - px2dp(100)
  }
})
