<template>
    <div class="ui container">
        <div></div>
        <h1>People Detail</h1>
        <div v-if="detail">
            <div class="ui two column centered stackable grid">
                <div class="ui six wide column centered">
                    <div class="ui cards centered">
                        
                        <people-item v-bind:people="detail"></people-item>
                        
                        <div class="ui container relaxed divided list">
                            <div class="item">
                                <div class="content">
                                <a class="header">Gender</a>
                                <div class="description">{{detail.gender}}</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="content">
                                <a class="header">Height</a>
                                <div class="description">{{detail.height}} kg</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="content">
                                <a class="header">Mass</a>
                                <div class="description">{{detail.mass}} cm</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="content">
                                <a class="header">Hair Color</a>
                                <div class="description">{{detail.hair_color}}</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="content">
                                <a class="header">Eye Color</a>
                                <div class="description">{{detail.eye_color}}</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="content">
                                <a class="header">Skin Color</a>
                                <div class="description">{{detail.skin_color}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui ten wide column">
                    <div class="ui relaxed divided list">
                        <div class="item">
                            <div class="content">
                                <h3 class="ui header">
                                    <i class="large film middle aligned icon"></i>
                                    Films
                                </h3>
                                <table-definition v-show="detail.filmList && detail.filmList.length > 0" :columns="tableDefinition.films.columns" :rows="tableDefinition.films.rows" :pointer="tableDefinition.films.pointer"></table-definition>
                            </div>
                        </div>
                        <div class="item">
                            <div class="content">
                                <h3 class="ui header">
                                    <i class="large user middle aligned icon"></i>
                                    Species
                                </h3>
                                <table-definition v-show="detail.speciesList && detail.speciesList.length > 0" :columns="tableDefinition.species.columns" :rows="tableDefinition.species.rows" :pointer="tableDefinition.species.pointer"></table-definition>
                            </div>
                        </div>
                        <div class="item">
                            <div class="content">
                                <h3 class="ui header">
                                    <i class="large space shuttle middle aligned icon"></i>
                                    Starships
                                </h3>
                                <table-definition v-show="detail.starshipList && detail.starshipList.length > 0" :columns="tableDefinition.starships.columns" :rows="tableDefinition.starships.rows" :pointer="tableDefinition.starships.pointer"></table-definition>
                            </div>
                        </div>
                        <div class="item">
                            <div class="content">
                                <h3 class="ui header">
                                    <i class="large car middle aligned icon"></i>
                                    Vehicles
                                </h3>
                                <table-definition v-show="detail.vehicleList && detail.vehicleList.length > 0" :columns="tableDefinition.vehicles.columns" :rows="tableDefinition.vehicles.rows" :pointer="tableDefinition.vehicles.pointer"></table-definition>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="errorMessage">
            {{errorMessage}}
        </div>

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
    </div>
</template>

<script type="text/javascript">

//components
import PeopleItem from '../components/peopleItem';
import TableDefinition from '../components/tableDefinition';

// utils
import { getPeopleDetail } from '../utils/service/peopleService';
import { getImage } from '../utils/service/pixabayService';

export default {
    name: 'PeopleDetail',
    components: {
        'people-item': PeopleItem,
        'table-definition': TableDefinition
    },
    created: function(){
        this.getDetail(this.$route.params.id);
    },
    data: function(){
        return {
            detail: null,
            tableDefinition: {},
            isLoading: false,
            errorMessage: null
        }
    },
    methods: {
        getDetail(id){
            this.isLoading = true;

            getPeopleDetail(id).then(res => {

                if(!res.data){
                    this.errorMessage = res.message;
                } else {
                    this.detail = Object.assign({}, res.data, {imgUrl: res.data.imgUrl || require('../assets/img/star-wars.png')});

                    // set table definition: films
                    this.tableDefinition.films = {
                        columns: [{key: 'title', value: 'Title'}, {key: 'director', value: 'Director'}, {key: 'producer', value: 'Producer'}, {key: 'totalCharacters', value: 'Total Characters'}, {key: 'release_date', value: 'Release Date'}],
                        rows: this.detail.filmList,
                        pointer: 'title'
                    }

                    // set table definition: species
                    this.tableDefinition.species = {
                        columns: [{key: 'name', value: 'Name'}, {key: 'classification', value: 'Classification'}, {key: 'designation', value: 'Designation'}, {key: 'average_lifespan', value: 'Average Lifespan'}, {key: 'language', value: 'Language'}],
                        rows: this.detail.speciesList,
                        pointer: 'name'
                    }

                    // set table definition: starship
                    this.tableDefinition.starships = {
                        columns: [{key: 'name', value: 'Name'}, {key: 'model', value: 'Model'}, {key: 'starship_class', value: 'Class'}, {key: 'manufacturer', value: 'Manufacturer'}, {key:'cargo_capacity', value: 'Capacity'}],
                        rows: this.detail.starshipList,
                        pointer: 'name'
                    }

                    // set table definition: vehicles
                    this.tableDefinition.vehicles = {
                        columns: [{key: 'name', value: 'Name'}, {key: 'model', value: 'Model'}, {key: 'vehicle_class', value: 'Class'}, {key: 'manufacturer', value: 'Manufacturer'}, {key:'cargo_capacity', value: 'Capacity'}],
                        rows: this.detail.vehicleList,
                        pointer: 'name'
                    }
                }

                this.isLoading = false;
            });
        },
        getImageUrl(query){
            let image = getImage(query);
            return image;
        }
    }
}
</script>
