import React from 'react';
import { Box } from '@mui/material';

const SecurityWrapper: React.FC<React.PropsWithChildren> = (props) => {
  return <Box>{props.children}</Box>;
};

export default SecurityWrapper;
