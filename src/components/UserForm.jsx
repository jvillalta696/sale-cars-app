import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUser } from "../services/auth.service";
import { getById } from "../services/firestore.service";
import M from "materialize-css";

const UserForm = ({ userId, onClose }) => {
    const [userData, setUserData] = useState(null);
    const [userConfig, setUserConfig] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUser(userId);
                setUserData(user.data);

                const userConfigDoc = await getById("usuarios", userId);
                setUserConfig(userConfigDoc.data());
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    useEffect(() => {
        M.updateTextFields(); // Initialize MaterializeCSS text fields
    }, [userData, userConfig]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("User data submitted:", { userData, userConfig });
    };

    const handleCompanySelection = (companyCode) => {
        const updatedCompanyList = userConfig.companyList.some((c) => c.code === companyCode)
            ? userConfig.companyList.filter((company) => company.code !== companyCode)
            : [
                ...userConfig.companyList,
                { code: companyCode, name: companies.find((c) => c.code === companyCode).name },
            ];
        setUserConfig({ ...userConfig, companyList: updatedCompanyList });
        console.log("Updated company list:", updatedCompanyList);
    };

    // Define the list of companies
    const companies = [
        { code: "01", name: "Coricar" },
        { code: "02", name: "GrandMotors" },
    ];

    if (!userData || !userConfig) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Edita Usuario</h3>
            <div className="row">
                <div className="col s6 input-field">
                    <input
                        name="email"
                        id="email"
                        placeholder="Email"
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                    <label htmlFor="email">
                        Email:
                    </label>
                </div>
                <div className="col s6 input-field">
                    <input
                        name="user"
                        id="user"
                        type="text"
                        value={userData.displayName}
                        onChange={(e) => setUserData({ ...userData, user: e.target.value })}
                    />
                    <label htmlFor="user">
                        User Name:
                    </label>
                </div>

            </div>
            <div className="row">
                <div className="col s6">
                    <label htmlFor="rol">
                        Role:
                    </label>
                    <select
                        className="browser-default"
                        name="rol"
                        id="rol"
                        value={userConfig?.rol || "USR"}
                        onChange={(e) => setUserConfig({ ...userConfig, rol: e.target.value })}
                    >
                        <option value="USR">USR</option>
                        <option value="ADM">ADM</option>
                    </select>

                </div>
                <div className="col s6">
                    <label>Company List:</label>
                    {companies.map((company) => (
                        <p key={company.code}>
                            <label>
                                <input
                                    type="checkbox"
                                    className="filled-in"
                                    checked={userConfig.companyList.some((c) => c.code === company.code)}
                                    onChange={() => handleCompanySelection(company.code)}
                                />
                                <span>{company.name}</span>
                            </label>
                        </p>
                    ))}
                </div>
            </div>
            <button type="submit" className="btn">Save</button>
            <button type="button" className="btn red" onClick={onClose}>
                Cancel
            </button>
        </form>
    );
};

UserForm.propTypes = {
    userId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default UserForm;
