

const callJSON = (methodType, endpoint, toStringify) => {
  return fetch(`http://localhost:5000/${endpoint}`, {
    method: methodType,
    body: JSON.stringify(toStringify),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
};



export {callJSON};
