// library
import request from 'superagent';

// utils
import API from '../config/api';

export function getImage(query, quality = 'large', placeholder = null){
    return new Promise((resolve, reject) => {
        request
            .get(`${API.PIXABAY}&q=${query}&image_type=photo`)
            .end((err, res) => {
                if(err){
                    resolve(placeholder);
                } else {
                    if(res.body.hits && res.body.hits.length > 0){
                        let item = res.body.hits[0];

                        switch(quality){
                            case 'large':
                                resolve(item.largeImageURL);
                            case 'user':
                                resolve(item.userImageURL);
                            case 'preview':
                                resolve(item.previewURL);
                            case 'web':
                                resolve(item.webformatURL);
                            default:
                                resolve(item.largeImageURL);
                        }
                    }

                    resolve(placeholder);
                }
            })
    })
    
}