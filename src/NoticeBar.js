/**
 * react-native-noticebar
 * @author ximolang<ximolang@yeah.net>
 */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

export default class NoticeBar extends Component {
  static defaultProps = {
    enableAnimation: true
  }

  // Animation Ways
  animationWays = [
    'step0',
    'step1',
    'linear',
    'ease',
    'quad',
    'cubic',
    'sin',
    'circle',
    'exp',
    'bounce'
  ]

  constructor(props) {
    super(props)

    let translateValue = new Animated.ValueXY({ x: 0, y: 0 })
    translateValue.addListener(({ x, y }) => { })

    this.state = {
      translateValue: translateValue,
      // 滚屏高度
      scrollHeight: this.props.scrollHeight || 36,
      // 每一次滚动切换之前延迟的时间
      delay: this.props.delay || 3000,
      // 每一次滚动切换的持续时间
      duration: this.props.duration || 500,
      // 滚屏内容
      kb_content: [],
      // Animated.View 滚动到的 y轴坐标
      kb_tempValue: 0,
      // 最大偏移量
      kb_contentOffsetY: 0,
      // 滚动动画
      enableAnimation: true
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps.data)
    this.setState({
      enableAnimation: nextProps.enableAnimation ? true : false
    }, () => {
      this.startAnimation()
    }
    )
  }

  componentDidMount() {
    let content = this.props.data || []
    if (content.length !== 0) {
      let h = (content.length + 1) * this.state.scrollHeight
      this.setState({
        kb_content: content.concat(content[0]),
        kb_contentOffsetY: h
      })

      // 开始动画
      this.startAnimation()
    }
  }

  _createKbItem(kbItem, index) {
    if (!kbItem) return null
    let barItem = this.props.renderBarItem

    let pressFunc = this.props.onPress
    return (
      <View key={index}>
        <TouchableOpacity
          style={[{ justifyContent: 'center', height: this.state.scrollHeight }, this.props.scrollBarStyle]}
          onPress={() => {
            pressFunc && pressFunc(kbItem, index)
          }}>
          {
            barItem(kbItem, index)
          }
        </TouchableOpacity>
      </View>
    )
  }

  startAnimation = () => {
    if (this.state.enableAnimation) {
      if (!this.animation) {
        this.animation = setTimeout(() => {
          this.animation = null
          this._startAnimation()
        }, this.state.delay)
      }
    }
  }

  componentWillUnmount() {
    if (this.animation) {
      clearTimeout(this.animation)
    }
    if (this.state.translateValue) {
      this.state.translateValue.removeAllListeners()
    }
  }

  _startAnimation = () => {
    let easingWay
    if (this.animationWays.includes(this.props.easing)) {
      easingWay = Easing[this.props.easing]
    } else {
      easingWay = Easing.linear
    }

    this.state.kb_tempValue -= this.state.scrollHeight
    if (this.props.onChange) {
      let index = Math.abs(this.state.kb_tempValue) / (this.state.scrollHeight)
      this.props.onChange(index < this.state.kb_content.length - 1 ? index : 0)
    }

    Animated.sequence([
      // Animated.delay(this.state.delay),
      Animated.timing(
        this.state.translateValue,
        {
          isInteraction: false,
          toValue: { x: 0, y: this.state.kb_tempValue },
          duration: this.state.duration, // 动画持续的时间（单位是毫秒），默认为500
          easing: easingWay
        }
      ),
    ])
      .start(() => {
        // 无缝切换
        // log('end')
        if (this.state.kb_tempValue - this.state.scrollHeight === -this.state.kb_contentOffsetY) {
          // 快速拉回到初始状态
          this.state.translateValue.setValue({ x: 0, y: 0 })
          this.state.kb_tempValue = 0
        }
        this.startAnimation()
      })
  }

  render() {
    return (
      <View style={[styles.kbContainer, { height: this.state.scrollHeight }, this.props.kbContainer]}>
        {
          this.state.kb_content.length !== 0 ?
            <Animated.View
              style={[
                { flexDirection: 'column' },
                {
                  transform: [
                    { translateY: this.state.translateValue.y }
                  ]
                }
              ]}>
              {this.state.kb_content.map(this._createKbItem.bind(this))}
            </Animated.View> : null
        }
      </View>
    )
  }
}

NoticeBar.propTypes = {
  data: PropTypes.array,
  renderBarItem: PropTypes.func,
  scrollHeight: PropTypes.number,
  scrollBarStyle: PropTypes.object,
  delay: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.string,
  onChange: PropTypes.func,
  onPress: PropTypes.func
}

const styles = StyleSheet.create({
  kbContainer: {
    backgroundColor: 'transparent',
    overflow: 'hidden'
  }
})
