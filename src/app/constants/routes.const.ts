// Url paths
export const HOME_ROUTE = 'home';
export const SURVEY_ROUTE = 'survey';
export const CREATE_SURVEY_ROUTE = 'create-survey';
export const JOIN_SURVEY_ROUTE = 'join-survey';
export const SURVEY_LIST_ROUTE = 'survey-list';
export const CLIENT_SURVEY_ROUTE = 'client-survey';
export const LIVE_RESULTS_ROUTE = 'live-results';

// API host urls
// export const HOST_URL = 'http://host-service.dev.svc.cluster.local:8081/api/host/surveys';
// export const HOST_URL = 'http://localhost/api/host/surveys';
export const HOST_URL = 'http://localhost:8081/surveys';
// export const CLIENT_URL = 'http://client-service.dev.svc.cluster.local:8082/api/client/surveys';
// export const CLIENT_URL = 'http://localhost/api/client/surveys';
export const CLIENT_URL = 'http://localhost:8082/surveys';


// API paths 
export const SUBMIT_SURVEY_ENDPOINT = "/submitSurvey";
export const LIVE_VOTE_ENDPOINT = "/live";