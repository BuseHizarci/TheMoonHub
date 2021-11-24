import React from "react"
import { RouteComponentProps } from "react-router"

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

interface Props extends RouteComponentProps<{ id?: string }> {}

interface State {
  post?: Post
}

export default class extends React.Component<Props, State> {
  state: State = {
    post: undefined
  }

  componentDidMount(): void {
    const {
      match: {
        params: { id }
      }
    } = this.props

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(post => {
        this.setState({ post })
      })
  }

  render() {
    const { post } = this.state

    if (!post) {
      return <div />
    }

    return (
      <div>
        <h1>{post.title}</h1>
        <span>by: {post.userId}</span>
        <hr />
        <span>{post.body}</span>
      </div>
    )
  }
}
