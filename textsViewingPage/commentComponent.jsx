let commentsList ;

window.showCommentsComponent = function showCommentsComponent(textName) {
    let domContainer = document.querySelector('.commentsAndFormContainer');
    console.log(domContainer);
    ReactDOM.render( <FormAndCommentsContainer textName={textName} />, domContainer);
};

class FormAndCommentsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.showNewComment = this.showNewComment.bind(this);
    }

    componentDidMount() {
        //let encodeTextName = encodeURI(textName);
        //console.log(encodeTextName);
        this.getComments(this.props.textName)
            .then( res => {this.setState({comments: res})});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.textName != this.props.textName) {
            this.getComments(this.props.textName)
                .then( res => {  this.setState({comments: res})  }
                );
        }
    }

    async getComments(textName) {
        //let encodeTextName = encodeURI(textName);
        //console.log(encodeTextName);
        let req = await fetch (`/getComments/${textName}`);
        let resp, sortedComments;
        if (req.ok) {
            resp = await req.json(); 
            sortedComments = [...resp.comments].sort((commentA, commentB) => Date.parse(commentB.commentDate) - Date.parse(commentA.commentDate));
        } else resp = req.status;


        console.log(resp, sortedComments);
        return sortedComments;
    }

    showNewComment(comment) {
        this.setState((state, props) => {return {comments: [comment, ...state.comments]};});
    }

    render () {
        console.log('state: ', this.state);
        if (this.state) 
            return (
                    <React.Fragment>
                        <CommentForm showNewComment={this.showNewComment}/>
                        <CommentsContainer comments={this.state.comments}/>
                    </React.Fragment>
        )
        else return 'Wait please';
    }
}

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {commentText: 'Yout comment'};
        this.handleCommentTextChange = this.handleCommentTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCommentTextChange(event) {
        this.setState({commentText: event.target.value}, () => console.log(this.state));
    }

    handleSubmit(event) {
        event.preventDefault();
        let commentObj = {
            'commentText': this.state.commentText,
            'userLogin': localStorage.getItem('userLogin'),
            'textName': sessionStorage.getItem('textName'),
            'commentDate': String(new Date()),
        };
        this.postComment(commentObj)
            .then( resp => {
                if (resp == "comment got") {
                    this.props.showNewComment(commentObj);
                }
            });
    }

    async postComment(commentObj) {
        let req = await fetch('/postComment', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify(commentObj),
            });

        let resp;
        if (req.ok) {
            resp = await req.text(); 
        } else resp = req.status;

        console.log(resp);   
        return resp;
    }

    render() {
        return (
        <div className="commentFormContainer">
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Add your comment</legend>
                    <textarea name="commentText" onChange={this.handleCommentTextChange} value={this.state.commentText} cols="30" rows="3"></textarea>
                </fieldset>
                <input type="submit" value="Send comment"></input>
            </form>
        </div>
        );
    }
};

//показывает комменты из getComments(textName)
function CommentsContainer(props) {

    return (
        <div className='commentsContainer'>
            {props.comments ? props.comments.map(comment => <Comment key={comment.commentText} commentObj={comment}></Comment>) : 'There will be comments...'}
        </div>
    )
}


function Comment(props) {
    return (
        <div className='commentInstance'>
            {props.commentObj.userLogin} commented at {props.commentObj.commentDate}.
            <div className = 'commentText'>
                {props.commentObj.commentText}
            </div>
        </div>
    );
};

