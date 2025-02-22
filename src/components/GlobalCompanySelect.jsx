import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import M from 'materialize-css';

const GlobalCompanySelect = () => {
  const { currentCompany, setCurrentCompany, config } = useAuth();
  const [selectedCompany, setSelectedCompany] = useState(currentCompany);

  useEffect(() => {
    M.updateTextFields();
    setSelectedCompany(currentCompany);
  }, [currentCompany]);

  const handleCompanyChange = (e) => {
    const selected = config.companyList.find(
      (company) => company.code === e.target.value
    );
    setSelectedCompany(selected);
    setCurrentCompany(selected);
  };

  return (
    <>
      <label htmlFor="company">Compañia</label>
      <select
        className="browser-default"
        value={selectedCompany?.code || ''}
        onChange={handleCompanyChange}
      >
        {config?.companyList?.map((company) => (
          <option key={company.code} value={company.code}>
            {company.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default GlobalCompanySelect;
