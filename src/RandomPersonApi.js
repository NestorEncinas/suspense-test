const randomPerson = () => {
  return fetch("https://randomuser.me/api")
    .then(r => r.json())
    .then(result => result.results[0]);
};

const suspensePromise = promise => {
  let status = "pending";
  let result = "";
  let suspend = promise.then(
    res => {
      status = "success";
      result = res;
    },
    error => {
      status = "error";
      result = error;
    }
  );

  return {
    // function that checks the status
    read() {
      if (status === "pending") {
        throw suspend;
      } else if (status === "error") {
        throw result;
      }

      return result;
    }
  };
};

export const randomNumber = () => {
  return new Promise(res => setTimeout(() => res(Math.random()), 3000));
};

export const createResource = () => {
  return {
    person: suspensePromise(randomPerson()),
    number: suspensePromise(randomNumber())
  };
};
