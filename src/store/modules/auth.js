import axios from 'axios';

const state = {
  user: localStorage.getItem('user') || null,
  posts: null,
};

const getters = {
    isAuthenticated: state => !!state.user,    
    StatePosts: state => state.posts,
    StateUser: state => state.user,
};

const actions = {
    async Register(form) {
        await axios.post('register', form)
    },

    async LogIn({dispatch, commit}, user) {
        console.log(user)
        await axios.post('login',user)
        await commit('setUser', user.get('username'))
        localStorage.setItem('user', user.get('username'))
        return await dispatch('GetPosts')
    },

    async CreatePost({dispatch}, post) {
        await axios.post('post', post)
        return await dispatch('GetPosts')
    },

    async GetPosts({ commit }){
        let response = await axios.get('posts')
        console.log(response)

        commit('setPosts', response.data)

    },

    async LogOut({commit}){
        localStorage.removeItem('user')
        commit('logout')
      }
};

const mutations = {
    setUser(state, username){
        state.user = username
    },

    setPosts(state, posts){
        state.posts = posts
    },
    logout(state){
        state.user = null
      },
};

export default {
  state,
  getters,
  actions,
  mutations
};