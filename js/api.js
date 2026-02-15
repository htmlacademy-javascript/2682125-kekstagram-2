const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: 'data',
  POST_DATA: '',
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const request = async (route, errorText, options = {}) => {
  const response = await fetch(`${BASE_URL}/${route}`, options);

  if (!response.ok) {
    throw new Error(errorText);
  }

  return response.json();
};

const getData = () => request(Route.GET_DATA, 'Не удалось загрузить данные. Попробуйте обновить страницу');

const sendData = (body) => request(
  Route.POST_DATA,
  'Не удалось отправить форму. Попробуйте ещё раз',
  {
    method: Method.POST,
    body
  }
);

export { getData, sendData };
