import { Link } from 'react-router-dom';

export default function Main() {
    return <main>
        <div className="content">
             <h2>Take a step into art</h2>
        <Link to="/products"><button className='showMore'>Show products</button></Link>
        </div>
       
    </main>
}