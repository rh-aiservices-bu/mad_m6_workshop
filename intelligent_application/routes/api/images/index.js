"use strict";

const moment = require("moment");
const _ = require("lodash");
const storage = require("../../../storage");
const axios = require("../../../utils/axios");
const { OBJECT_DETECTION_URL, DISPLAY_BOX } = require("../../../utils/constants");
const imageStoragePrefix = "images";
const FormData = require('form-data');
const Blob = require('buffer');

module.exports = async function (fastify, opts) {
  fastify.post("/", async function (request, reply) {
    const image = _.get(request, "body.image");
    if (!image) {
      reply.code(422);
      return {
        status: "error",
        statusCode: 422,
        message: "Missing Fields: image",
      };
    }

    const base64data = image.replace(/^da36ta:image\/(png|jpg|jpeg);base64,/, "");
    const buff = Buffer.from(base64data, "base64");

    let file;
    try {
      file = await writeJpg(buff, request);
    } catch (error) {
      request.log.error("error occurred writing photo");
      request.log.error(error);
    }

    const { code, data } = await requestObjectDetection(base64data);
    reply.code(code);
    data.displayBox = DISPLAY_BOX;
    return data;
  });
};

async function writeJpg(data, request) {
  const photoId = generateFilename();
  try {
    const response = await storage.writeFile(data, photoId);
    return photoId;
  } catch (error) {
    request.log.error(`Failure to write ${photoId} to storage`);
    throw error;
  }
}

function generateFilename() {
  const date = moment().format("YYYYMMDD-HH:mm:ss:SSS");
  const random = Math.random().toString(36).slice(-5);
  return `${imageStoragePrefix}/${date}-${random}.jpg`;
}

async function requestObjectDetection(image) {
  let code, data;
  try {
    let bf = Buffer.from(image, "base64");
    const formData = new FormData();
    formData.append('file', bf, 'image.jpg');
    const response = await axios({
      method: "POST",
      url: OBJECT_DETECTION_URL,
      data: formData,
      headers: { ...formData.getHeaders(),},
    });
    code = response.status;
    data = response.data;
  } catch (error) {
    if (error.response) {
      code = error.response.status;
      data = {
        status: "error",
        statusCode: error.response.status,
        message: `Error from object detection service: ${error.message}`,
        data: error.response.data,
      };
    } else if (error.request) {
      code = 500;
      data = {
        status: "error",
        statusCode: 500,
        message: `No response was received from object detection service: ${error.message}`,
      };
    } else {
      code = 500;
      data = {
        status: "error",
        statusCode: 500,
        message: error.message,
      };
    }
  }

  return { code, data };
}
