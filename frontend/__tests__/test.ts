export const TestingGenerics = <T>(arr: T[], value: T) => {
  return [value, ...arr];
};

const x = TestingGenerics([1, 2, 3, ""], "giorgos");

x[0];
