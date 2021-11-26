import axios from "axios";
import addInterceptor from "./credentialsInterceptor";

function createClient() {
  const client = axios.create();
  addInterceptor(client);
  return client;
}

const client = createClient();

export default client;
