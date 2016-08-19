import React from 'react';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

export default (props) => {
  return (
    <Card style={{ width: '256px' }}>
      <CardTitle
        avatar="https://placeimg.com/80/80/animals"
        title="Avatar style title"
        subtitle="Subtitle here"
      />
      <CardMedia
        aspectRatio="wide"
        image="https://placeimg.com/800/450/nature"
      />
      <CardTitle
        title="Title goes here"
        subtitle={props.description}
      />
      <CardText>{props.description}</CardText>
      <CardActions>
        <Button label="Action 1" />
        <Button label="Action 2" />
      </CardActions>
    </Card>
  )
}
