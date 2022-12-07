import ErrorMessage from "../errorMessage/ErrorMessage"
import {Link} from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <Link style={{display: "block"}} to="/">
                    <div style={{display: "block", width: "250px", margin:"0 auto", 'border': '2px solid blue', 'fontSize': '26px', }}> Page doesn't exist 404</div>
                </Link>

        </div>
    )

}

export default Page404;