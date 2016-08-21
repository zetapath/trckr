import React from 'react';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

export default (props) => {
  return (
    <Card style={{ width: '256px' }}>
      <CardTitle
        avatar="https://placeimg.com/80/80/animals"
        title={props.provider}
        subtitle={props.updatedAt}
      />
      <CardTitle
        title={props.title}
        subtitle={props.trackingNumber}
      />
      <CardText>{props.description}</CardText>
      <CardActions>
        <Button label="Details" />
        <Button label="Mark as recived" />
      </CardActions>
    </Card>
  )
}
