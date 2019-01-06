import axios from 'axios';
import reverseGeoCode from 'latlng-to-zip';
import { Location } from 'expo';
import qs from 'qs';

import JOB_DATA from './indeed_job_data.json';

import {
    FETCH_JOBS,
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

const buildJobsUrl = (zip) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    return `${JOB_ROOT_URL}${query}`;
};


const MY_API_KEY = 'getyourownAPIkey:-)';
const GOOGLE_ROOT_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const GOOGLE_QUERY_PARAMS = {
    result_type: 'postal_code',
    key: MY_API_KEY
};

const buildGoogleReverseGeoUrl = (region) => {
    const query = qs.stringify({ latlng: `${region.latitude},${region.longitude}`, ...GOOGLE_QUERY_PARAMS });
    return `${GOOGLE_ROOT_URL}${query}`;

}

export const fetchJobs = (region, callback) => async (dispatch) => {
    try {
        // let zip = await reverseGeoCode(region);
        /* Google API solution - works
        let google_url = buildGoogleReverseGeoUrl(region);
        let { data: googleData } = await axios.get(google_url);
        let { results } = googleData;
        let zip = results[0].address_components[0].short_name;
        */

        /* Expo Location solution - works */
        // let result = await Location.reverseGeocodeAsync(region);
        // let { postalCode: zip } = result[0];

        // const url = buildJobsUrl(zip);
        // let { data } = await axios.get(url);
        let data = [...JOB_DATA.results]; // publisher ID does not work, so dummying up data
        dispatch({ type: FETCH_JOBS, payload: data });
        callback();

    } catch(e) {
        console.error(e);
    }
};

export const likeJob = (job) => {
    return {
        type: LIKE_JOB,
        payload: job
    };
};

export const clearLikedJobs = () => {
    return {
        type: CLEAR_LIKED_JOBS
    };
};

