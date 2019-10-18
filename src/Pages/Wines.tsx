import React, { Fragment, useState } from 'react';
import Pagination from 'antd/lib/pagination'; // i only installed antd for this component
import { Select } from 'antd';
import { Box } from '@chakra-ui/core';
import { WineTile } from '../Components';
import { useAsyncFetch } from '../api';
const { Option } = Select;

type WinesProps = {
  path?: string;
};

// no time to make dynamic page sizes
const fixedSizePage = 5;
const allType = { id: 'All', name: 'All' };

const Wines: React.FC<WinesProps> = props => {
  const [page, setPage] = useState(1);
  const [type, setType] = useState(allType.name);

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
      <Box marginBottom={4}>
        <Select
          size='large'
          dropdownMatchSelectWidth={false}
          onSelect={(sel: any) => {
            if (sel !== type) {
              setType(sel);
              setPage(1);
            }
          }}
          value={type}
        >
          {types &&
            [allType, ...types].map((t: { id: number; name: string }) => (
              <Option key={t.id} value={t.name}>
                {t.name}
              </Option>
            ))}
        </Select>
      </Box>
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
