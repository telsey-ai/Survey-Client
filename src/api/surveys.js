import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexSurvey = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/survey',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createSurvey = (survey, user) => {
  console.log(survey)
  return axios({
    url: apiUrl + '/survey',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      survey: {
        title: survey.title
      }
    }
  })
}

export const deleteSurvey = (user, id) => {
  return axios({
    url: apiUrl + '/survey/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const updateSurvey = (survey, user, id) => {
  return axios({
    url: apiUrl + '/survey/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      survey: {
        title: survey.title
      }
    }
  })
}
