import {useState, useEffect} from 'react';
import {appId, baseUrl} from '../utils/variables';

const doFetch = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const useMedia = (update) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMedia = async (start = 0, limit = 10) => {
    setLoading(true);
    try {
      // const response = await fetch(
      //   `${baseUrl}media?start=${start}&limit=${limit}`
      // );
      // if (!response.ok) {
      //   throw Error(response.statusText);
      // }
      // const json = await response.json();
      const json = await useTag().getFilesByTag(appId);
      const media = await Promise.all(
        json.map(async (item) => {
          const responsePromise = await fetch(
            baseUrl + 'media/' + item.file_id
          );
          const mediaData = await responsePromise.json();
          return mediaData;
        })
      );
      setMediaArray(await media);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(async () => {
    await loadMedia();
  }, [update]);

  const postMedia = async (formData, token) => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };
    const result = await doFetch(baseUrl + 'media', options);
    result && setLoading(false);
    return result;
  };

  return {mediaArray, postMedia, loading};
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    const json = await doFetch(baseUrl + 'login', options);
    return json;
  };
  return {postLogin};
};

const useUser = () => {
  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const json = await doFetch(baseUrl + 'users', options);
    return json;
  };

  const putUser = async (data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    };
    const json = await doFetch(baseUrl + 'users', options);
    return json;
  };

  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    const userData = await doFetch(baseUrl + 'users/user', options);
    return userData;
  };

  const checkUsername = async (userName) => {
    const response = await doFetch(baseUrl + 'users/username/' + userName);
    return await response.available;
  };

  return {getUserByToken, postUser, putUser, checkUsername};
};

const useTag = () => {
  const postTag = async (tagData, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(tagData),
    };
    return await doFetch(baseUrl + 'tags/', options);
  };

  const getFilesByTag = async (tag) => {
    return await doFetch(baseUrl + 'tags/' + tag);
  };

  return {postTag, getFilesByTag};
};

export {useMedia, useLogin, useUser, useTag};
