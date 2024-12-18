import api from '../api';

export const getAll = async (token) => {
  const response = await api.get('/users', {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
  return response.data;
};

export const getId = async (id) => {
  const response = await api.get(`/users/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const update = async (id, payload, token) => {
  const response = await api.put(`/users/${id}`, payload, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const destroy = async (id, token) => {
  const response = await api.delete(`/users/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const create = async (payload, token) => {
  const response = await api.post('/users', payload, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
