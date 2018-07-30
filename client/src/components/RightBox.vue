<template>
  <div>
    <h4 id="bisabang">
      <strong>Restaurants Near You!</strong>
    </h4>
    <div v-for="result in results" :key="result" id="leftright">

      <router-link to="">
        <a @click="restaurantDirect(result.restaurant.events_url)" target="_blank">
          <p> <img :src="result.restaurant.featured_image"></p>
        </a>
      </router-link>
      <router-link to="">
        <a @click="restaurantDirect(result.restaurant.events_url)" target="_blank">
          <h6 style="color:blue"> {{result.restaurant.name}}, &#9733; {{result.restaurant.user_rating.aggregate_rating}} </h6>
        </a>
      </router-link>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      results: [],
      res_web: ''
    }
  },
  created() {
    this.getRestaurant()
  },

  methods: {
    getRestaurant() {
      axios
        .get(
          'https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&cuisines=chinese%20food&sort=rating',
          {
            headers: {
              'user-key': 'cbf1bd42229d436146095791fab08cc3'
            }
          }
        )
        .then(response => {
          this.results = response.data.restaurants
          // console.log(response.data.restaurants[0])

          this.results = this.shuffle(this.results.slice(0, 5))
          // console.log(this.results)
        })
    },
    restaurantDirect(value) {
      // console.log(value);
      window.location.href = value
    },
    shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      return array
    }
  }
}
</script>

<style>
</style>
