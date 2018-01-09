import request from '@/common/request'


// 拉取画单列表
export const getPaintList = (param) => request.get('/api/painting/'+param+'/paint_list')

// 拉取画单详情
export const getPaintDetail = (param) => request.get('/api/painting/'+param+'/info')

// 删除多个画单
export const deletePaint = (param) => request.post('/api/painting/delete_list', param)

// 修改画单
export const updatePaint = (param) => request.post('/api/painting/set_paint_info', param)

//拉取画作详情
export const getPicInfo = (param) => request.get('/api/painting/picture/'+param+'/info')

// 上传缩略图
export const uploadThumbnail = (param) => request.post('/test/api/img/upload/capsule',param)

// 通过id查询画单
export const getPaintListById = (param) => request.get('/api/painting/'+param+'/info')

// 通过关键词查询画单
export const getPaintListByKw = (param) => request.get('/op/search/info?kw='+param)

// 拉取大咖说列表
export const getGrandCafeList = (param) => request.get('/op/discovery/get_mq_list')

// 修改大咖说
export const updateGrandCafe = (param) => request.post('/op/discovery/set_mq_info',param)

// 删除大咖说
export const deleteGrandCafe = (param) => request.get('/op/discovery/mq_delete',param)

// 拉取读精彩列表
export const getReadWonderList = (param) => request.get('/api/discovery/get_cq_list')

// 设置艺术先锋页面显示读精彩
export const setPoineerCq = (param) => request.post('/op/discovery/set_poineer_cq', param)