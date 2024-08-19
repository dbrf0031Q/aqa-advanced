const axios = require('axios');
const fetchWithError = async () => {
  try {
    const response = await axios.get('https://nonexistent.url');
    return response.data;
  } catch (error) {
    throw new Error('Request failed');
  }
};

const fetchWithHeadersAndParams = async () => {
  const headers = {
    'Custom-Header': 'customValue'
  };
  const params = {
    param1: 'value1',
    param2: 'value2'
  };

  const response = await axios.get('https://qauto.forstudy.space/api/test', { headers, params });
  return response.data;
};

const fetchData = async () => {
  try {
    const response = await axios.get('https://qauto.forstudy.space/api/success');
    return response.data;
  } catch (error) {
    throw new Error('Request failed');
  }
};

const fetchWithFailure = async () => {
  try {
    const response = await axios.get('https://qauto.forstudy.space/api/failure');
    return response.data;
  } catch (error) {
    throw new Error('Request failed');
  }
};

// Тести
jest.mock('axios');

describe('fetchWithError', () => {
  test('should handle error correctly and return error message', async () => {
    await expect(fetchWithError()).rejects.toThrow('Request failed');
  });
});

describe('fetchWithHeadersAndParams', () => {
  test('should include custom headers and URL params in the request', async () => {
    axios.get.mockResolvedValue({ data: 'response' });

    await fetchWithHeadersAndParams();

    expect(axios.get).toHaveBeenCalledWith('https://qauto.forstudy.space/api/test', {
      headers: { 'Custom-Header': 'customValue' },
      params: { param1: 'value1', param2: 'value2' }
    });
  });
});

describe('fetchData', () => {
  test('should handle successful request', async () => {
    axios.get.mockResolvedValue({ data: 'success' });

    const result = await fetchData();

    expect(result).toBe('success');
  });

  test('should handle failed request', async () => {
    axios.get.mockRejectedValue(new Error('Request failed'));

    await expect(fetchWithFailure()).rejects.toThrow('Request failed');
  });
});
