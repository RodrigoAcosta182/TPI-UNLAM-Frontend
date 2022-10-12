export const verificaOrdenArray = (a) => {
    const length = a.length;

    if (length <= 1) return true;

    for (let index = 0; index < length - 1; index++) {
      if (a[index] > a[index + 1]) return false;
    }

    return true;
  };