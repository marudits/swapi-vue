<template>
    <div class="ui container">
        <div>
            <h1>People List</h1>
        </div>
        <div class="ui search">
            <div class="ui icon input">
                <input class="prompt" type="text" placeholder="Search People..." v-on:keyup="handleSearch" v-model="search">
                <i class="search icon"></i>
            </div>
            <div class="results"></div>
        </div>

        <div class="ui divider"></div>

        <div class="grid" v-show="isLoading">
            <div class="ui icon message" >
                <i class="notched circle loading icon"></i>
                <div class="content">
                    <div class="header">
                    Just one second
                    </div>
                    <p>We're fetching that content for you.</p>
                </div>
            </div>
        </div>
        
        <div v-if="people && people.length > 0" v-show="!isLoading">
            <div class="ui five stackable link cards">
                <people-item v-for="item in people" v-bind:key="`people-${item.url}`" v-bind:people="item" v-bind:clickable="true" class="people-item">
                </people-item>
            </div>

            <div class="ui divider"></div>
            
            <div class="ui buttons" v-for="n in Math.ceil(total/10)" :key="n">
                <router-link :to="`people?page=${n}${search ? '&search=' + search : ''}`">
                    <button v-on:click="getPeopleList(n, search)" class="ui button">{{n}}</button>
                </router-link>
            </div>
        </div>
        <div v-if="!people">
            No Data
        </div>
    </div>
</template>

<script type="text/javascript">
//components
import PeopleItem from '../components/peopleItem';

// utils
import { getPeople } from '../utils/service/peopleService';
import { getImage } from '../utils/service/pixabayService';


export default {
    name: 'People',
    components: {
        'people-item': PeopleItem
    },
    created: function(){
        let page = this.$route.query.page || 1,
            search = this.$route.query.search || ''; 
        this.getPeopleList(page, search);
    },
    data: function(){
        return {
            people: [],
            total: 0,
            isLoading: true,
            search: ''
        }
    },
    methods: {
        getPeopleList(page = 1, search = ''){
            this.isLoading = true;
            getPeople(page, search).then(res => {
                this.people = res.data.results;
                this.total = res.data.count;
                this.isLoading = false;
            })
        },
        getImageUrl(query){
            getImage(query).then(res => {
                return res;
            });
        },
        handleSearch(e){
            if(e.keyCode == 13){
                this.$router.replace(`/people?page=1&search=${this.search}`)
                this.getPeopleList(1, this.search);
                
            }
        }
    }
}
</script>

<style lang="scss">
    .people {
        &-item {
            .image {
                min-height: 180px;

                img {
                    max-height: 180px;
                }
            }
        }
    }
</style>
