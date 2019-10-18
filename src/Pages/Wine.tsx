import React, { Fragment } from 'react';
import { useAsyncFetch } from '../api';
import { WineTile } from '../Components';

type WineProps = {
  path?: string;
  wineId?: number | string;
};

const Wine: React.FC<WineProps> = ({ wineId }) => {
  const [wine, loading, error] = useAsyncFetch('getWine', wineId, [wineId]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;

  return <Fragment>{wine && <WineTile isDetailed {...wine} />}</Fragment>;
};

export default Wine;
