import React from 'react';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
        <div>
            Dahboard Nav <br />
            <Outlet/>
            Dashboard Footer
        </div>
    );
};

export default DashboardLayout;