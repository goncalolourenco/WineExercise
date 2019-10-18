import React, { Fragment, useState } from 'react';
import Pagination from 'antd/lib/pagination'; // i only installed antd for this component
import Select from 'antd/lib/Select';
import { Box } from '@chakra-ui/core';
import { WineTile } from '../Components';
import { useAsyncFetch } from '../api';

type WinesProps = {
  path?: string;
};

// no time to make dynamic page sizes
const fixedSizePage = 5;

const Wines: React.FC<WinesProps> = props => {
  const [page, setPage] = useState(1);
  const [type, setType] = useState('');

  const [wines, loading, error] = useAsyncFetch(
    'getWines',
    { first: fixedSizePage, skip: (page - 1) * fixedSizePage, type },
    [page, type, fixedSizePage]
  );

  const [types] = useAsyncFetch('getTypes', {}, []);

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;

  return (
    <Fragment>
      {wines && wines.data.map((wine: any) => <WineTile key={wine.id} {...wine} />)}
      {wines && wines.numberOfItems && (
        <Box display='flex' justifyContent='center'>
          <Pagination current={page} onChange={setPage} pageSize={fixedSizePage} total={wines.numberOfItems} />
        </Box>
      )}
    </Fragment>
  );
};

export default Wines;
