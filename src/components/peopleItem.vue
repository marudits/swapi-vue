<template>
    <div class="card" v-on:click="navigateTo(`people/${people.url.split('/')[5]}`)">
        <div class="image">
            <img :src="imgUrl">
        </div>
        <div class="content">
            <div class="header">{{people.name}}</div>
            <div class="meta">
                <span v-bind:title="`Planet`">{{planet}}</span>
            </div>
            
            <div class="description">
                <div class="ui grid">
                    <div class="four wide column" v-bind:title="`Films`">
                        <i class="film icon"></i> {{people.films.length}}
                    </div>
                    <div class="four wide column" v-bind:title="`Species`">
                        <i class="user icon"></i> {{people.species.length}}
                    </div>
                    <div class="four wide column" v-bind:title="`Starships`">
                        <i class="space shuttle icon"></i> {{people.starships.length}}
                    </div>
                    <div class="four wide column" v-bind:title="`Vehicles`">
                        <i class="car icon"></i> {{people.vehicles.length}}
                    </div>
                </div>
            </div>
        </div>
        <div class="extra content">
            <span class="right floated">
                Birth on {{ people.birth_year }}
            </span>
        </div>
    </div>
</template>

<script type="text/javascript">

// utils
import { getItemDetail } from '../utils/service/peopleService';
import { getImage } from '../utils/service/pixabayService';

export default {
    name: 'PeopleItem',
    props: ['people', 'clickable'],
    created: function(){
        // set imgUrl
        getImage(this.people.name).then((res, err) => {
            if(err || !res){
                this.imgUrl = require('../assets/img/star-wars.png');
            } else {
                this.imgUrl = res;
            }
        })

        // set homeworld
        getItemDetail(this.people.homeworld).then(res => {
            this.planet = res.name
        });
    },
    data: function() {
        return {
            imgUrl: '',
            planet: ''
        }
    },
    methods: {
        navigateTo(url){
            if(this.clickable){
                this.$router.push(url)
            }
        }
    } 
}
</script>

