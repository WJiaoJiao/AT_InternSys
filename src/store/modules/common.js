import * as types from '@/store/types'

const state = {
  breadcrumbs: []
}

const mutations = {
  [types.SET_BREADCRUMBS] (state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs
  }
}

const actions = {}

export default {
  state,
  actions,
  mutations
}
