import request from '@/common/request'

// 拉取最新画单列表
export const getLastedList = () => request.get('/painting/1/paint_list')

// 拉取画单详情
export const getPaintDetail = (param) => request.get('/painting/'+param+'/info ')