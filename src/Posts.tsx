import React from "react"
import { Link } from "react-router-dom"
import "./Post.css"

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

interface Props { }

interface State {
  posts: Post[]
  filteredPosts: Post[],
  query: string
}

export default class extends React.Component<Props, State> {
  state: State = {
    posts: [],
    filteredPosts: [],
    query: ""
  }

  componentDidMount(): void {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts })
        this.setState({ filteredPosts: posts })
      })
  }


  searchPosts = (e: any) => {
    e.preventDefault();
   

    if (this.state.query === "") {
      this.setState({ filteredPosts: this.state.posts })
      return;
    }
    let filtered = this.state.posts.filter((value) => {

      return value.title.indexOf(this.state.query) > 0 || value.body.indexOf(this.state.query) > 0;

    })

    
    this.setState({ filteredPosts: filtered })

  }

  render() {
    const { filteredPosts, query } = this.state

    return (
      <>
        <form className="form" onSubmit={this.searchPosts}>
          <label className="label" htmlFor="query"> The Moon Hub </label>
          <input className="input" type="text" name="query"
            placeholder="Search Post"
            value={query} onChange={(e) => this.setState({ query: e.target.value })}
          />
          <button className="button" type="submit">Search</button>
        </form>
        <div className="post-list">
          {filteredPosts.map(post => (
            <div key={post.id} className="post-item">
              <Link to={`posts/${post.id}`} className="post-link">
                <h3 className="post--title">{post.title}</h3>
              </Link>
              <span>{post.body}</span>
            </div>
          ))}
        </div>
      </>
    )
  }
}
