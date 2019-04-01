// exports
export default {

  createAsyncKeys: (type) => {
    const typeUpper = type.toUpperCase();

    return {
      SUCCESS: `${typeUpper}_SUCCESS`,
      FAILURE: `${typeUpper}_FAILURE`,
      PENDING: `${typeUpper}_PENDING`,
      LOADING: `${typeUpper}_LOADING`,
      STATE: `${typeUpper}_DATA`,
    };
  },

  getAPIHost: () => {
    const base = process.env.API_HOST;

    return `${base}/v1`;
  },

};
