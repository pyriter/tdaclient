import axios from 'axios';
import addInterceptor from './credentialsInterceptor';

const client = axios.create();
addInterceptor(client);

export default client;
