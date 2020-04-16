'use strict';
let  headerMainContent = <React.Fragment>
    Hi!
    Here you can think about many important questions in your life and see what other people think about it.
    And you can take a contact of person, who have interesting opinion for you.;
</React.Fragment>;

let headerAdditionalContent = `We have a lot of texts, partitioned by categories and you can comment all of them after filling the registration form.`

function HeaderContent(props) {
    if (props.showAdditionalContent == "true") {
        return (
            <div className = "headerContent">
                Hi!<br></br>
                Here you can think about many important questions in your life and see what other people think about it.<br></br>
                And you can take a contact of person, who have interesting opinion for you.<br></br>
                We have a lot of texts, partitioned by categories and you can comment all of them after filling the registration form.
            </div>
        )
    } else {
        return (
            <div className = "headerContent">
                Hi!<br></br>
                Here you can think about many important questions in your life and see what other people think about it.<br></br>
                And you can take a contact of person, who have interesting opinion for you...
            </div>
        )
    }
}

function ShowHideSwitcher(props) {
    if (props.showAdditionalContent == "true") {
        return (
        <span className = "tooglerHeaderAdditionalContent" onClick = {() => props.parentHandleClick()}>Hide</span>
        )
    } else {
        return (
            <span className = "tooglerHeaderAdditionalContent" onClick = {() => props.parentHandleClick()}>Show more information</span>
        )
    }
}

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {additionalContent: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        console.log(this.state.additionalContent);
        this.setState((state, props) => ({additionalContent: !state.additionalContent}))
        console.log(this.state.additionalContent);
    }

    render() {
        if (this.state.additionalContent == true) {
            return (
                <React.Fragment>
                    <HeaderContent showAdditionalContent = "true"/>
                    <ShowHideSwitcher showAdditionalContent = "true" parentHandleClick = {this.handleClick}/>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <HeaderContent showAdditionalContent = "false"/>
                    <ShowHideSwitcher showAdditionalContent = "false" parentHandleClick = {this.handleClick}/>
                </React.Fragment>
            )
        }
    }
}

let domContainer = document.querySelector('.headerComponent');
ReactDOM.render(<HeaderComponent />, domContainer);