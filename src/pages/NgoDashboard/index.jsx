// DashboardLayout.js
import React from 'react';
import { Layout, Menu, Input, Button } from 'antd';
import { AppstoreOutlined, BarChartOutlined, CreditCardOutlined, SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Overview from './Overview';
import { useAuthContext } from '../../context/Auth';
import Compaigns from './Compaigns';
import Donors from './Donors';
import Donations from './Donations';
import NoPage from '../Misc/NoPage';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const NGODashboard = () => {
    const { handleLogout } = useAuthContext()

    const pathKeyMap = {
        '/dashboard/overview': '1',
        '/dashboard/compaign/*': '2',
        '/dashboard/donations': '3',
        '/dashboard/donors': '4',
    };

    const location = useLocation();
    const selectedKey = location.pathname.includes(pathKeyMap) // Adjust logic as needed

    return (
        <Layout>
            <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => { console.log(broken); }} onCollapse={(collapsed, type) => { console.log(collapsed, type); }} className="custom-sider">
                <div className="logo text-center py-4 fw-bold text-black"><b className='text-primary' >GIve</b>Hope</div>
                <Menu mode="inline"
                    selectedKeys={[pathKeyMap[selectedKey]]}
                    className="menu-light">
                    <Menu.Item key="1" icon={<BarChartOutlined />}>
                        <Link to="/dashboard/overview">Overview</Link>
                    </Menu.Item>
                    <SubMenu key="2" icon={<AppstoreOutlined />} title="Compaign">
                        <Menu.Item key="2-1">
                            <Link to="/dashboard/compaign/all">Manage Compaign</Link>
                        </Menu.Item>
                        <Menu.Item key="2-2">
                            <Link to="/dashboard/compaign/add">Add Compaign</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="3" icon={<CreditCardOutlined />}>
                        <Link to="/dashboard/donations">Donations</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        <Link to="/dashboard/donors">Donors</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="topbar d-flex justify-content-between align-items-center px-4">
                    <Input prefix={<SearchOutlined />} placeholder="Search..." style={{ width: 300 }} />
                    <div className="d-flex align-items-center">
                        <Button type="primary" color='default' variant='solid' htmlType="submit" onClick={handleLogout}>Logout</Button>
                    </div>
                </Header>

                <Content className="dashboard-content px-4 py-4">
                    <Routes>
                        <Route path='/overview' element={<Overview />} />
                        <Route path='/compaign/*' element={<Compaigns />} />
                        <Route path='/donations' element={<Donations />} />
                        <Route path='/donors' element={<Donors />} />
                        <Route path='*' element={<NoPage />} />
                    </Routes>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default NGODashboard;
