const ViewWelcome = () => {
    const contentStyle = {display:"flex",justifyContent:"center",marginTop:20, paddingTop:20};
  return (
    <div className="container">
            <div style={contentStyle}>
            </div>
            <div className="card">
                <div className="card-content">
                <span className="card-title">Bienvenido a SaleCars</span>
                <p>
                    ¡Bienvenido a la aplicación SaleCars! Aquí puedes gestionar diversas tareas como administración de clientes, Consulta y validación de datos de Vehiculos, Crear o modificar contratos de venta y más. Navega por la aplicación usando el menú para explorar todas las funciones disponibles para ti.
                </p>
                </div>
            </div>
        
      
    </div>
  );
};

export default ViewWelcome;