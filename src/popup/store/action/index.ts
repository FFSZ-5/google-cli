/*
 * @Author: hukai huzhengen@gmail.com
 * @Date: 2024-11-04 15:13:24
 * @LastEditors: hukai huzhengen@gmail.com
 * @LastEditTime: 2024-11-04 15:13:32
 * @FilePath: \dome-react\src\store\counterSlice.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 创建计数器切片slice
// 导入创建切片的函数

import { createSlice } from "@reduxjs/toolkit";

// 定义初始化状态
const initialState = { value: 0 };
// 创建切片
const counterSlice = createSlice({
  // 切片名称
  name: "counter",
  // 初始化状态
  initialState,
  // 定义处理器
  reducers: {
    // 处理加法
    increment: (state) => {
      state.value += 1;
    },
    // 处理减法
    decrement: (state) => {
      state.value -= 1;
    },
    // 处理加法
    addValue: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 导出动作
export const { increment, decrement, addValue } = counterSlice.actions;
// 导出处理器
export default counterSlice.reducer;
// 导出异步操作动作
export const syncAddvalue = (value) => (dispatch) => {
  setTimeout(() => {
    dispatch(addValue(value));
  }, 2000);
};
