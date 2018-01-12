import request from '@/common/request'


// 拉取画单列表
export const getPaintList = (param) => request.get('/api/painting/'+param+'/paint_list')

// 拉取画单详情
export const getPaintDetail = (param) => request.get('/api/painting/'+param+'/info')

// 普通画单删除
export const deleteNormalPaint= (param) => request.post('/api/painting/delete_list', param)

// 删除最新,最热列表中的画单
export const deletePaint = (param) => request.post('/op/discovery/delete_paint_list', param)

// 修改画单
export const updatePaint = (param) => request.post('/api/painting/set_paint_info', param)

//拉取画作详情
export const getPicInfo = (param) => request.get('/api/painting/picture/'+param+'/info')

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

// 修改读精彩
export const setCqList = (param) => request.post('/op/discovery/set_cq_list', param)

// 删除读精彩
export const deleteCqList= (param) => request.post('/api/discovery/delete_cq_list', param)

// 设置今日推荐最新，最热的显示。今日推荐banner，艺术先锋
export const setPaintList= (param) => request.post('/op/discovery/set_paint_list', param)

// 画单添加到最新,最热列表中
export const addPaintList= (param) => request.post('/op/discovery/add_paint_list', param)

// 画单添加,删除画作
export const addDeletePaint= (param) => request.post('/op/painting/add_delete_paint', param)

// 上传图片
export const uploadPicture = (param) => request.post('/api/imgs/upload/common',param)

// 上传excel
export const uploadExcel = (param) => request.post('/api/file/execl_upload',param)

// 上传excel
export const getAuthorPaintList = (param) => request.get('/op/painting/'+ param +'/author_paint_list')
