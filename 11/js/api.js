const URL_SERVER_GET = 'https://27.javascript.pages.academy/kekstagram/data';
const URL_SERVER_POST = 'https://27.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(URL_SERVER_GET)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail('Не удалось получить данные с сервера. Попробуйте обновить страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    URL_SERVER_POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
