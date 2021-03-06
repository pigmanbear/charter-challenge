import React from 'react'
import {Segment, Container, Header} from 'semantic-ui-react'

const HeaderComponent = () => (
    <div>
        <Segment
            inverted
            textAlign='center'
            style={{
            minHeight: 250,
            padding: '1em 0em'
        }}
            vertical>
            <Container text>
                <Header
                    icon='github'
                    as='h1'
                    inverted
                    content='Github Repository Explorer'
                    style={{
                    fontSize: '3em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '1em'  
                }}/>
                <Header
                    as='h2'
                    content='Details for Github Users'
                    inverted
                    style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal'
                }}/>
            </Container>
        </Segment>
    </div>
)

export default HeaderComponent