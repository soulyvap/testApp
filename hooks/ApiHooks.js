import {useState, useEffect, useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
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

const useMedia = (update, myFilesOnly = false) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useContext(MainContext);

  const loadMedia = async (start = 0, limit = 10) => {
    setLoading(true);
    try {
      let json = await useTag().getFilesByTag(appId);
      if (myFilesOnly) {
        json = json.filter((file) => file.user_id === user.user_id);
      }
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

  const putMedia = async (formData, token, fileId) => {
    setLoading(true);
    const options = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    const result = await doFetch(baseUrl + 'media/' + fileId, options);
    result && setLoading(false);
    return result;
  };

  const deleteMedia = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    };
    return doFetch(baseUrl + 'media/' + fileId, options);
  };

  return {mediaArray, postMedia, putMedia, deleteMedia, loading};
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

  const getUserById = async (userId, token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    const userData = await doFetch(baseUrl + 'users/' + userId, options);
    return userData;
  };

  return {getUserByToken, postUser, putUser, checkUsername, getUserById};
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

const useFavourite = () => {
  const postFavourite = async (fileId, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({file_id: fileId}),
    };
    return await doFetch(baseUrl + 'favourites', options);
  };
  const getFavouritesByFileId = async (fileId) => {
    return doFetch(baseUrl + 'favourites/file/' + fileId);
  };
  const deleteFavourite = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    };
    return doFetch(baseUrl + 'favourites/file/' + fileId, options);
  };

  return {postFavourite, getFavouritesByFileId, deleteFavourite};
};

export {useMedia, useLogin, useUser, useTag, useFavourite};
