import { IMAGE_API } from './globalConfig';

export const imageSearch = (searchTerm: string) => {
  return IMAGE_API.get(`/search?query=${searchTerm}&orientation=square`)
    .then(({ data }) => {
      if (data.photos) {
        const imgUri: string = data.photos[0].src.medium;
        return imgUri;
      } else {
        return '';
      }
    })
    .catch((err) => {
      console.log('ERROR Retrieving image', err);
      return '';
    });
};
