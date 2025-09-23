// NGODashboard.js
import React, { useState } from 'react';
import { Layout, Menu, Input, Button, Dropdown } from 'antd';
import { AppstoreOutlined, BarChartOutlined, CreditCardOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import Overview from './Overview';
import Compaigns from './Compaigns';
import Donors from './Donors';
import Donations from './Donations';
import NoPage from '../Misc/NoPage';
import { useAuthContext } from '../../context/Auth';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

const NGODashboard = () => {
    const { handleLogout } = useAuthContext();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    // Menu key mapping
    const pathKeyMap = {
        '/dashboard/overview': '1',
        '/dashboard/compaign/all': '2-1',
        '/dashboard/compaign/add': '2-2',
        '/dashboard/donations': '3',
        '/dashboard/donors': '4',
    };

    const selectedKey = Object.keys(pathKeyMap).find(path => location.pathname.includes(path));

    // Search function
    const handleSearch = async (value) => {
        if (!value.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        setSearchQuery(value);

        try {
            const res = await axios.get(`https://backend-theta-silk-38.vercel.app/compaigns/search?query=${value}`);
            setResults(res.data.compaigns || []);
        } catch (err) {
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Dropdown for search results
    const searchMenu = (
        <Menu>
            {results.length === 0 && !loading ? (
                <Menu.Item key="no-result">No results found</Menu.Item>
            ) : (
                results.map(c => (
                    <Menu.Item key={c._id}>
                        <Link to={`/dashboard/compaign/view/${c._id}`}>{c.title}</Link>
                    </Menu.Item>
                ))
            )}
        </Menu>
    );

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                className="custom-sider"
            >
                <div className="logo text-center py-4 fw-bold text-black">
                    <b className='text-primary'>Give</b>Hope
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[pathKeyMap[selectedKey]]}
                    className="menu-light"
                >
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
                    <Dropdown overlay={searchMenu} visible={results.length > 0}>
                        <Search
                            prefix={<SearchOutlined />}
                            placeholder="Search campaigns..."
                            style={{ width: 300 }}
                            enterButton
                            loading={loading}
                            onSearch={handleSearch}
                        />
                    </Dropdown>
                    <div className="d-flex align-items-center">
                        <Button type="primary" onClick={handleLogout}>Logout</Button>
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
