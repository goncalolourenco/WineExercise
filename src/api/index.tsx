import fakeData, { fakeTypes, fakeGrapes } from './fakeData';

function wait(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export type WineType = {
  id: string;
  name: string;
  type: string;
  grapes: string[];
  image: {
    url: string;
  };
  region: string;
  liked: boolean;
  description: string;
};

type getWines = {
  skip?: number;
  first?: number;
  fromRegion?: [string];
  type?: string;
  last?: number;
};

const api = {
  // put some filters as parameters
  async getWines({ first, last, fromRegion, skip, type }: getWines) {
    // fetch behaviour
    await wait(1000);
    let data = [...fakeData];

    if (fromRegion) {
      data = data.filter(wine => fromRegion.indexOf(wine.region) > -1);
    }

    if (type) {
      data = data.filter(wine => wine.type === type);
    }

    let _skip = skip ? skip : 0;
    if (first) {
      data = data.slice(_skip, first + _skip);
    } else if (last) {
      data = data.slice(data.length - last - _skip, data.length - _skip);
    }

    return { data, numberOfItems: fakeData.length };
  },

  async getWine(id: string | number) {
    // fetch behaviour
    await wait(1000);

    const wine = fakeData.find(wine => wine.id === id);
    return wine;
  },

  async insertWine(wine: Omit<WineType, 'id'>) {
    // fetch behaviour
    await wait(1000);

    const lastWine = fakeData[fakeData.length - 1];
    const newWine = { ...wine, id: lastWine.id + 1 };

    fakeData.push(newWine);

    return { success: true, wine: newWine };
  },

  async getTypes() {
    // fetch behaviour
    await wait(100);

    return [...fakeTypes];
  },

  async getGrapes() {
    // fetch behaviour
    await wait(100);

    return [...fakeGrapes];
  }
};

export { default as useAsyncFetch } from './useAsyncFetch';
export default api;
