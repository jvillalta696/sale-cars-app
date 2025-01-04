import { useState, useEffect, useContext } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import { MockAuthContext } from '../context/MockAuthContext';

const Login = () => {
    const [companies, setCompanies] = useState([]);
    const { signIn } = useContext(MockAuthContext);
    const [usr, setUsr] = useState({ email: '', password: '' });
    const [selectedCompany, setSelectedCompany] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(usr.email, usr.password);
        } catch (error) {
            alert("Usuario incorrecto ", error.message)
        }       
       
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsr((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
        console.log(usr);
    };

    const handleCompanyChange = (e) => {
        setSelectedCompany(e.target.value);
    };

    useEffect(() => {
        // Initialize Materialize CSS select
        M.AutoInit();
        // Fetch companies data (mocked for now)
        setCompanies(['Company A', 'Company B', 'Company C']);
    }, []);

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col s12 m8 offset-m2 l6 offset-l3">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Login</span>
                                <div className="input-field">
                                    <input 
                                        id="user" 
                                        type="text" 
                                        className="validate" 
                                        name="email"
                                        value={usr.email}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="user">User</label>
                                </div>
                                <div className="input-field">
                                    <input 
                                        id="password" 
                                        type="password" 
                                        className="validate" 
                                        name="password"
                                        value={usr.password}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className="input-field">
                                    <select id="company" value={selectedCompany} onChange={handleCompanyChange}>
                                        <option value="" disabled>Choose your company</option>
                                        {companies.map((company, index) => (
                                            <option key={index} value={company}>{company}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="company">Company</label>
                                </div>
                            </div>
                            <div className='card-action' >
                                <div className="row">
                                    <div className="col s12">
                                        <button className="btn waves-effect waves-light" 
                                            type="submit" 
                                            name="action"
                                        >
                                        Iniciar Sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;