// library
import request from 'superagent';
import async from 'async';

// utils
import API from '../config/api';
import { getImage } from '../service/pixabayService';

export function getPeople(page = 1, search = ''){
    return new Promise((resolve, reject) => {
        let data = [];
        request
            .get(`${API.BASE_URL_SECURE}${API.RES_PEOPLE}/?page=${page}&search=${search}`)
            .end((err, res) => {
                if(err){
                    reject({
                        status: false,
                        message: err.response.body.detail || err.message || err,
                        data: null
                    });
                }

                resolve({
                    status: true,
                    message: null,
                    data: res.body
                });
            })
    })
}

export function getPeopleDetail(id = 0){
    return new Promise((resolve, reject) => {
        request
            .get(`${API.BASE_URL_SECURE}${API.RES_PEOPLE}/${id}`)
            .end((err, res) => {
                if(err){
                    console.log('error block: ', err);
                    resolve({
                        status: false,
                        message: err.response.body.detail || err.message || err,
                        data: null
                    });
                } else {
                    let detail = res.body;

                    async.waterfall([
                        // get people image
                        function (cb){
                            getImage(detail.name, 'large').then(res => {
                                detail.imgUrl = res;
                                cb(null, Object.assign({}, detail))
                            })
                        },

                        // get people planet
                        function(data, cb){
                            getItemDetail(data.homeworld).then(res => {
                                let planet = {
                                    name: res.name,
                                    population: res.population,
                                    terrain: res.terrain,
                                    climate: res.climate,
                                    url: res.url
                                }
                                cb(null, Object.assign({}, data, {planet: planet}))
                            });
                        },

                        // get films
                        function(data, cb){
                            let films = []
                            detail.films.forEach(x => {
                                getItemDetail(x).then(res => {
                                    films.push({
                                        title: res.title,
                                        director: res.director,
                                        producer: res.producer,
                                        totalCharacters: res.characters.length,
                                        release_date: res.release_date,
                                        url: res.url
                                    });
                                });
                            })

                            cb(null, Object.assign({}, data, {filmList: films}))
                        },

                        // get species
                        function(data, cb){
                            let species = []
                            detail.species.forEach(x => {
                                getItemDetail(x).then(res => {
                                    species.push({
                                        name: res.name,
                                        classification: res.classification,
                                        designation: res.designation,
                                        average_lifespan: res.average_lifespan,
                                        language: res.language,
                                        url: res.url
                                    });
                                });
                            })

                            cb(null, Object.assign({}, data, {speciesList: species}))
                        },

                        // get vehicles
                        function(data, cb){
                            let vehicles = []
                            detail.vehicles.forEach(x => {
                                getItemDetail(x).then(res => {
                                    vehicles.push({
                                        name: res.name,
                                        model: res.model,
                                        manufacturer: res.manufacturer,
                                        crew: res.crew,
                                        passengers: res.passengers,
                                        cargo_capacity: res.cargo_capacity,
                                        length: res.length,
                                        vehicle_class: res.vehicle_class,
                                        url: res.url
                                    });
                                });
                            })

                            cb(null, Object.assign({}, data, {vehicleList: vehicles}))
                        },

                        // get starships
                        function(data, cb){
                            let starships = []
                            detail.starships.forEach(x => {
                                getItemDetail(x).then(res => {
                                    starships.push({
                                        name: res.name,
                                        model: res.model,
                                        manufacturer: res.manufacturer,
                                        crew: res.crew,
                                        passengers: res.passengers,
                                        cargo_capacity: res.cargo_capacity,
                                        length: res.length,
                                        starship_class: res.starship_class,
                                        cost_in_credits: res.cost_in_credits,
                                        url: res.url
                                    });
                                });
                            })

                            cb(null, Object.assign({}, data, {starshipList: starships}))
                        },
                        
                    ], (err, res) => {
                        if(err){
                            resolve({
                                status: true,
                                message: null,
                                data: detail
                            })
                        }

                        resolve({
                            status: true,
                            message: null,
                            data: res
                        })
                    })
                }
            })
    })
}

export function getItemDetail(url){
    return new Promise((resolve, reject) => {
        request
            .get(url)
            .end((err, res) => {
                if(err){
                    reject(null)
                }
                resolve(res.body);
            })
    })
}