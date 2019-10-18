import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import { Box } from '@chakra-ui/core';

const PageContainer: React.FC = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Box
        display='flex'
        flexDirection='column'
        width='100%'
        maxWidth='600px'
        minHeight='calc(100vh - 96px)'
        margin='0 auto'
        paddingY={10}
      >
        {children}
      </Box>
      <Footer />
    </Fragment>
  );
};

const Header: React.FC = () => {
  return (
    <Box as='header' height={12} backgroundColor='red.300'>
      <Box as='ul' display='flex' margin={0} listStyleType='none' flexDirection='row' alignItems='center' height='100%'>
        <Box as='li' padding={3}>
          <Link style={{ color: 'white' }} to='/'>
            Home
          </Link>
        </Box>
        <Box as='li' padding={3}>
          <Link style={{ color: 'white' }} to='/wine/new'>
            Add Bottle
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

const Footer: React.FC = () => {
  return <Box height={12} backgroundColor='red.300' />;
};

export default PageContainer;
