import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUser, updateUser, createUser,deleteUser } from "../services/auth.service";
import { getById, getReferenceById, update, insert } from "../services/firestore.service";
import M from "materialize-css";


const UserForm = ({ userId, onClose }) => {
    const [userData, setUserData] = useState(null);
    const [userConfig, setUserConfig] = useState(null);
    const [environment, setEnvironment] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                if (userId) {
                    const user = await getUser(userId);
                    setUserData(user.data);

                    const userConfigDoc = await getById("usuarios", userId);
                    const userConfigData = userConfigDoc.data();
                    setUserConfig(userConfigData);

                    if (userConfigData.config) {
                        const configId = userConfigData.config.id;
                        setEnvironment(userConfigData.config.id);
                    }
                } else {
                    setUserData({ email: "", displayName: "" });
                    setUserConfig({user:"", rol: "USR", companyList: [] });
                    setEnvironment("API_TEST");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    useEffect(() => {
        M.updateTextFields();
    }, [userData, userConfig]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {            
            if (userId) {
                await updateUser(userId, { displayName: userData.displayName });
                const updatedConfig = {
                    ...userConfig,
                    config: environment ? await getReferenceById("config", environment) : null,
                };
                await update("usuarios", updatedConfig, userId);
                console.log("User and configuration updated successfully.");
            } else {
                const newUser = await createUser({
                    email: userData.email,
                    displayName: userData.displayName,
                    password: userData.password,
                });
                const newConfig = {
                    ...userConfig,
                    config: environment ? await getReferenceById("config", environment) : null,
                };
                try {
                    await insert("usuarios", newConfig, newUser.data.uid);
                }
                catch (error) {
                    await deleteUser(newUser.data.uid);
                    throw new Error("Error creating user configuration: " + error.message);
                }
                M.toast                
                console.log("User and configuration created successfully.");
            }
            onClose();
        } catch (error) {
            M.toast({ html: `Error saving user: ${error}`, classes: "red" });
            console.error("Error saving user:", error);
        }finally {
            setIsLoading(false);
        }
    };

    const handleCompanySelection = (companyCode) => {
        const updatedCompanyList = userConfig.companyList.some((c) => c.code === companyCode)
            ? userConfig.companyList.filter((company) => company.code !== companyCode)
            : [
                ...userConfig.companyList,
                { code: companyCode, name: companies.find((c) => c.code === companyCode).name },
            ];
        setUserConfig({ ...userConfig, companyList: updatedCompanyList });
    };

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
            {isLoading && <div className="progress"><div className="indeterminate"></div></div>}
            <div className="row">
                <div className="col s6 input-field">
                    <input
                        name="formemail"
                        id="formemail"
                        placeholder="Email"
                        type="email"
                        autoComplete="off"
                        value={userData.email}
                        disabled={userData.uid}
                        onChange={(e) => {
                            setUserData({ ...userData, email: e.target.value });
                            setUserConfig({ ...userConfig, email: e.target.value });
                        }}
                    />
                    <label htmlFor="formemail">Email:</label>
                </div>
                <div className="col s6 input-field">
                    <input
                        name="formuser"
                        id="formuser"
                        type="text"
                        autoComplete="off"
                        value={userData.displayName}
                        onChange={(e) => {
                            setUserData({ ...userData, displayName: e.target.value });
                            setUserConfig({ ...userConfig, user: e.target.value });
                        }}
                    />
                    <label htmlFor="formuser">Nombre Usuario:</label>
                </div>
            </div>
            {!userId && (
                <div className="row">
                    <div className="col s6 input-field">
                        <input
                            name="formpassword"
                            id="formpassword"
                            type="text"                            
                            placeholder="Password"                            
                            value={userData.password || ""}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        />
                        <label htmlFor="formpassword">Password:</label>                        
                    </div>
                </div>
            )}
            <div className="row">
                <div className="col s12 m3">
                    <label htmlFor="rol">Role:</label>
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
                <div className="col s12 m3">
                    <label htmlFor="env">Ambiente</label>
                    <select
                        name="env"
                        id="env"
                        className="browser-default"
                        value={environment || "API_TEST"}
                        onChange={(e) => setEnvironment(e.target.value)}
                    >
                        <option value="API_TEST">Pruebas</option>
                        <option value="API_PROD">Productivo</option>
                    </select>
                </div>
                <div className="col s12 m3">
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
            <button type="button" className="btn" onClick={handleSave}>
                {userId ? "Actualizar" : "Guardar"}
            </button>
            <button type="button" className="btn red" onClick={onClose}>
                Cancel
            </button>
        </form>
    );
};

UserForm.propTypes = {
    userId: PropTypes.string, // Made optional
    onClose: PropTypes.func.isRequired,
};

export default UserForm;
