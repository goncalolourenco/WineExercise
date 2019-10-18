import React, { Fragment } from 'react';
import { WineType } from '../api';
import { Box } from '@chakra-ui/core';
import { navigate } from '@reach/router';

const WineTile: React.FC<WineType & { isDetailed: boolean }> = ({
  id,
  image,
  name,
  description,
  type,
  region,
  grapes,
  isDetailed
}) => {
  return (
    <Box marginBottom={12} display='flex' {...(isDetailed && { marginBottom: 'auto', marginTop: 'auto' })}>
      <Box as='figure' margin='0 -30px 0  0'>
        <img src={image && image.url} alt='wine-bottle' />
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='space-between' flex='0 1 100%'>
        <Box as='h2' textAlign='center' cursor='pointer' onClick={() => navigate(`/wine/${id}`)}>
          {name}
        </Box>
        {isDetailed && (
          <Fragment>
            <Box as='p' marginTop={0}>
              From {region}
            </Box>
            <Box as='p' marginTop={0}>
              Regions :{grapes.join(' ')}
            </Box>
          </Fragment>
        )}
        <Box textAlign='center'>{description}</Box>
        <Box as='span' alignSelf='flex-end'>
          {type} wine
        </Box>
      </Box>
    </Box>
  );
};

export default WineTile;
