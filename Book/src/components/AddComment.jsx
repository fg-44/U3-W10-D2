import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const AddComment = () => {

  // variabili globali

  const [comment, setComment] = useState({
    comment: '',
    rate: 1,
    elementId: 1000
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' +
        this.props.asin,
        {
          method: 'POST',
          body: JSON.stringify(comment),
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer inserisci-qui-il-tuo-token'
          }
        }
      );
      if (response.ok) {
        const { success: isSuccess } = await response.json();
        if (isSuccess) {
          setSuccess(true);
        } else {
          setError(response.statusText);
        }
        setComment({
          ...comment,
          comment: '',
          rate: 1,
          elementId: 2000
        });
      } else {
        throw new Error('Qualcosa è andato storto');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (comment && comment.elementId) {
      fetch(`/check-comment?elementId=${comment.elementId}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer inserisci-qui-il-tu-token'
        }
      })
        .then(response => response.json())
        .then(isSuccess => {
          setError(null);
          if (!isSuccess) {
            setError('Il commento non è disponibile');
          }
        });
    }
  }, [comment, setError]);

  render() {
    return (
      <div className="my-3">
        <Form onSubmit={this.sendComment}>
          <Form.Group className="mb-2">
            <Form.Label>Recensione</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci qui il testo"
              value={this.state.comment.comment}
              onChange={(e) => this.setState({
                  comment: {
                    ...this.state.comment,
                    comment: e.target.value,
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Valutazione</Form.Label>
            <Form.Control
              as="select"
              value={this.state.comment.rate}
              onChange={(e) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    rate: e.target.value,
                  },
                })
              }
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Invia
          </Button>
        </Form>
      </div>
    );
  }
  
}

export default AddComment

//---------------------------------

