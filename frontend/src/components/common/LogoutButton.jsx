import React from 'react'
import useLogout from '../../hooks/useLogout';


const LogoutButton = () => {
const {loading, logout} = useLogout();

{!loading ? (<>
	<li className='cursor-pointer'><a className="dropdown-item" onClick={logout}><i className='bx bx-log-out-circle'></i><span className='ml-4'>Logout</span></a>
	</li>
</>) : (<span className='loading loading-spinner'>Loading...</span>)}
}

export default LogoutButton