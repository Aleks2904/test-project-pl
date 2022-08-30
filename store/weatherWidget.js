export const state = () => ({
  searchList: [],
  cityList: [],
})

export const mutations = {
  setCityList(state, value){
    state.cityList = value
  },
  setSearchList(state, value){
    state.searchList = value;
  },
}

export const getters = {
  getCityList: state => state.cityList,
  getSearchList: state => state.searchList,

}

export const actions = {
  async requestUserCity({ dispatch }){
    const weatherList = JSON.parse(localStorage.getItem('weather'));
    if(weatherList.length > 0){
      for(let item of weatherList){
        await dispatch('requestWeather', item);
      }
    }else{
      await this.$axios("https://ipinfo.io/json?token=49907de41360a7")
        .then( async res => {
          const city = res.data ? {lat:res.data.loc.split(',')[0], lon:res.data.loc.split(',')[1]} : {lat: 0, lon: 0};
          await dispatch('requestWeather', city);
        })
    }
  },

  async requestWeather( { commit, state }, { lat, lon }){
    const apiKey = "ab5b93fa4f6f7ee30ad8871e472d3b2c";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${apiKey}`;
    await this.$axios(url).then((res) => {
      const list = [...state.cityList, res.data];
      commit('setCityList', list)
    })
  },

  async requestSearchCity({commit}, city){
    const apiKey = '617e069d5af355e42eee783033ccd6dc';
    await this.$axios(`https://htmlweb.ru/geo/api.php?json&city_name=${city}&api_key=${apiKey}`).then((res) => {
      commit('setSearchList', res.data)
    })
  }
}


