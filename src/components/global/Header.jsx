import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import AppContext from '../../context/AppContext';
import SortModal from './SortModal';
import Filter from './Filter';
import Sort from './Sort';

import '../../styles/Header.css';

const Header = () => {
  const mql = window.matchMedia('(max-width: 800px)');
  const onMobileDevice = mql.matches;
  const {
    data,
    setEditMode,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleResetData,
  } = useContext(AppContext);

  const active = {
    borderBottom: '2px solid red',
    backgroundColor: '#eee',
    padding: 'auto 20px',
  };
  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container fluid>
          <Navbar.Brand>
            <NavLink
              to='/'
              className='nav-title-style'
              onClick={handleResetData}
            >
              Contact App
            </NavLink>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='navbarScroll' />

          <Navbar.Collapse id='navbarNav'>
            <Nav
              className='my-2 my-lg-0 ms-auto align-items-center'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavLink
                to='add'
                className='p-3 nav-link-style'
                style={({ isActive }) => (isActive ? active : undefined)}
                onClick={() => setEditMode(false)}
              >
                Add Contact
              </NavLink>
              <div className='d-flex align-items-center'>
                <input
                  type='search'
                  placeholder='Search'
                  className='mx-2 nav-input-style'
                  aria-label='Search'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <BsSearch onClick={handleSearch} />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <hr style={{ margin: '0px !important' }} /> */}
      {data.length > 1 && (
        <Navbar>
          {onMobileDevice ? (
            <>
              {' '}
              <div className='sortby-nav'>
                <SortModal />
              </div>
              <Filter />
            </>
          ) : (
            <>
              <Sort />
              <Filter />
            </>
          )}
        </Navbar>
      )}
    </>
  );
};

export default Header;
