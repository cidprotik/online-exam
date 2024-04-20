import { React,useState } from 'react';
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		
		e.preventDefault();
		await login(username, password);
	};
	return (
		<div class="wrapper bg-forgot">
		<div class="authentication-forgot d-flex align-items-center justify-content-center">
			<div class="card forgot-box" style={{width:"340px"}}>
				<div class="card-body p-3">
				  <form onSubmit={handleSubmit}>
					<div class="p-4 rounded  border">
						<div className="d-flex justify-content-center">
							<img src="assets/images/cidlogo.png" width="120" alt="" />
						</div>
						<div class="my-4">
						  <input type="text" class="form-control" placeholder="User Name" value={username} onChange={(e) => setUsername(e.target.value)}/>
						</div>
						<div class="my-4">
						  <input type="password" class="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
						</div>
						<div class="d-grid">
						<button type="submit" class="btn btn-white" disabled={loading}>
							{loading ? (<span className='loading loading-spinner'></span>):<span>Login</span>}
						</button>
					   </div>
					</div>
				  </form>
				</div>
			</div>
		</div>
	</div>
	);
};
export default Login;