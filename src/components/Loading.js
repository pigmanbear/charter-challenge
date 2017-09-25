import React from 'react';
import {Container, Icon} from 'semantic-ui-react'

const Loading = () => (
  <Container text textAlign='center' style={{
    marginTop: '2em'
  }}>
    <Icon.Group size='huge'>
      <Icon loading size='big' name='circle notched'/>
      <Icon name='github alternate'/>
    </Icon.Group>
  </Container>
);

export default Loading;
