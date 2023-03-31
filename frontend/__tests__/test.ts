export const TestingGenerics = <T>(arr: T[], value: T) => {
  return [value, ...arr];
};

const x = TestingGenerics([1, 2, 3, ""], "giorgos");

x[0];

const initiateUser = async () => {
  fetch("http://localhost:4569/v1/testing")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUser = async () => {
  fetch("http://localhost:4569/v1/testing1")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const editUser = async () => {
  fetch("http://localhost:4569/v1/testing2")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
