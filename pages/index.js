import React, { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";

export default function Auth() {
	const { username, setUsername, secret, setSecret } = useContext(Context);
	const router = useRouter();

	function onSubmit(e) {
		e.preventDefault();
		if (username.length === 0 || secret.length === 0) return;
		axios
			.put(
				"https://api.chatengine.io/users/",
				{ username, secret },
				{
					headers: {
						"Private-key": "42dadbc8-22ca-4c40-9f82-8d46dc280d0f",
					},
				}
			)
			.then((response) => {
				router.push("/chats");
			});
	}

	return (
		<div className='background'>
			<div className='auth-container'>
				<form className='auth-form' onSubmit={(e) => onSubmit(e)}>
					<div className='auth-title'>NextJS Chat</div>
					<div className='input-container'>
						<input
							placeholder='Email'
							className='text-input'
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className='input-container'>
						<input
							type='password'
							placeholder='Password'
							className='text-input'
							onChange={(e) => setSecret(e.target.value)}
						/>
					</div>
					<button type='submit' className='submit-button'>
						Login / Sign-up
					</button>
				</form>
			</div>
		</div>
	);
}
