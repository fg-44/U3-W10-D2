import { Component } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = () => {
  const [comments, setComments] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const getComments = async (asin) => {
      setLoading(true);
      try {
        let response = await fetch(
          'https://striveschool-api.herokuapp.com/api/comments/' +
          this.props.asin,
          {
            headers: {
              Authorization: 'Bearer inserisci-qui-il-tu-token',
            },
          }
        )
        console.log(response)
        if (response.ok) {
          let comments = await response.json()
          setError(false);
          setComments(comments);
          setLoading(false);
        } else {
          setError(response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.log(error)
        setError(error.message);
        setLoading(false);
      }
    };

    if (comments.length > 0) {
      getComments(commentAreaElementId);
    }
  }, [comments]);

  return (
    <div className="text-center">
      {loading && <Loading>Loading...</Loading>}
      {error && <Error />}
      <AddComment asin={commentAreaElementId} />
      <CommentList comments={comments} />
    </div>
  );
};


export default CommentArea
