import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './PageNotFound.css'

function PageNotFound() {

    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()

    const handleReturn = () => {
        history.push('/')
    }

    return <div className="page-not-found-container">
        <h1>Page Not Found</h1>
        <div>
            {sessionUser ? <h3 className="return-button" onClick={handleReturn}>Return to Workspaces</h3>
            : <h3 className="return-button" onClick={handleReturn}>Return to Home</h3>}
        </div>
    </div>
}

export default PageNotFound
