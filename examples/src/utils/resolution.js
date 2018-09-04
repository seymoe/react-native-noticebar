/*
 * 屏幕工具类 以及一些常用的工具类封装
 * ui设计基准,iphone 6
 * width:750px
 * height:1334px
 * @2x
 */

import {PixelRatio, Dimensions, Platform} from 'react-native'

export const ww = Dimensions.get('window').width
export const wh = Dimensions.get('window').height
export const isIos = () => Platform.OS === 'ios'
export let pixelRatio = PixelRatio.get()
const fontScale = PixelRatio.getFontScale()
//像素密度
export const DEFAULT_DENSITY = 2
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的750和1334为对应尺寸即可.
const w2 = 750 / DEFAULT_DENSITY
//px转换成dp
const h2 = 1334 / DEFAULT_DENSITY

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp
 */
export function fSize(size) {
  let scaleWidth = ww / w2
  let scaleHeight = wh / h2
  let scale = Math.min(scaleWidth, scaleHeight)
  size = Math.round((size * scale + 0.5))
  return size / DEFAULT_DENSITY
}

/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 */
export function px2dp(size) {
  let scaleWidth = ww / w2
  let scaleHeight = wh / h2
  let scale = Math.min(scaleWidth, scaleHeight)
  size = Math.round((size * scale + 0.5))
  return size / DEFAULT_DENSITY
}