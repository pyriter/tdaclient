/**
 * Copyright © 2020
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
import axios from "axios";

export default function createClient() {
  return axios.create();
}
