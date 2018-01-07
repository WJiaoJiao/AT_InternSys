import request from '@/common/request'


// 拉取画单列表
export const getPaintList = (param) => request.get('/api/painting/'+param+'/paint_list')

// 拉取画单详情
export const getPaintDetail = (param) => request.get('/api/painting/'+param+'/info')

//删除多个画单
export const deletePaint = (param) => request.post('/api/painting/delete_list', {data: param})

//修改画单
export const updatePaint = (param) => request.post('/api/painting/set_paint_info', param)

//拉取画作详情
export const getPicInfo = (param) => request.get('/api/painting/picture/'+param+'/info')

//上传缩略图
export const uploadThumbnail = (param) => request.post('/test/api/img/upload/capsule',param)
