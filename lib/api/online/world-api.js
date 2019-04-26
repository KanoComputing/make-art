let token;

export default function (config) {
	function getHeaders(extra) {
		const headers = new Headers(Object.assign({
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}, extra || {}));
		if (token) {
			headers.append('Authorization', `Bearer ${token}`);
		}
		return headers;
	}

	function formatShare(share) {
		share.user = {
			username: share.username,
		};
		return share;
	}

	return {
		user: {
			checkUsernameAvailability(username) {
				return fetch(`${config.API_URL_V2}/accounts/checkUsernameExists/${username}`, { headers: getHeaders() })
					.then(res => res.json())
					.then(res => !JSON.parse(res.data));
			},
			register(form) {
				const body = Object.assign({ erole: 'notset' }, form);
				return fetch(`${config.API_URL_V2}/accounts`, {
					method: 'POST',
					headers: getHeaders(),
					body: JSON.stringify(body),
				})
				.then(res => res.json())
				.then(res => res.data);
			},
			login(username, password) {
				return fetch(`${config.API_URL_V2}/accounts/auth`, {
					method: 'POST',
					headers: getHeaders(),
					body: JSON.stringify({ username, password }),
				}).then(res => res.json())
				.then(res => res.data);
			},
			setToken(t) {
				token = t;
			},
			getById(id) {
				return fetch(`${config.API_URL_V2}/users/${id}`, { headers: getHeaders() })
					.then(res => res.json())
					.then(res => {
						const { user } = res.data;
						user.avatar = `${res.data.aBurl}/${user.id}/head.png`;
						return user;
					});
			},
			logout(reload) {
				token = null;
				if (reload) {
					location.reload();
				}
			},
			forgotUsername(email) {
				return fetch(`${config.API_URL_V2}/accounts/forgotUsername`, {
					method: 'POST',
					headers: getHeaders(),
					body: JSON.stringify(email),
				}).then(res => res.json())
				.then(res => res.data);
			},
			forgotPassword(username) {
				return fetch(`${config.API_URL_V2}/accounts/forgotPassword`, {
					method: 'POST',
					headers: getHeaders(),
					body: JSON.stringify(username),
				}).then(res => res.json())
				.then(res => res.data);
			}
		},
		share: {
			list: () => {
				return fetch(`${config.API_URL_V2}/shares?app=kano-draw&limit=19`, {
					headers: getHeaders(),
				})
					.then(res => res.json())
					.then((res) => {
						return fetch(`${config.API_URL_V2}/shares?ids=${res.data.join(',')}`, {
							headers: getHeaders(),
						}).then(res => res.json())
					})
					.then((res) => {
						const { shares } = res.data;
						shares.forEach((share) => {
							Object.keys(share.attachments || {}).forEach((key) => {
								const url = `${res.data.atBurl}/${share.id}/${key}.${share.attachments[key]}`;
								share[key] = url;
								share[`${key}_url`] = url;
								share.attachments[key] = url;
							});
						});
						return {
							body: {
								entries: shares.map(s => formatShare(s)),
							},
						};
					});
			},
			post: (data) => {
				const url = `${config.API_URL_V2}/shares`;
				return fetch(url, {
					method: 'POST',
					headers: getHeaders(),
					body: JSON.stringify({
						app: data.app,
						title: data.title,
						description: data.description,
						hardware: [],
						isPrivate: false,
						attachments: {
							attachment: 'draw',
							cover: 'png',
						},
					})
				})
				.then(res => res.json())
				.then(res => res.data)
				.then((share) => {
					const uploads = Object.keys(share.aturls)
						.map((key) => {
							const signedUrl = share.aturls[key];
							return fetch(signedUrl, {
								method: 'PUT',
								body: data.files[key],
								headers: new Headers({
									'Content-Type': data.files[key].type,
								}),
							});
						});
					return Promise.all(uploads).then(() => share);
				})
				.then((res) => {
					const { share } = res;
					return {
						body: {
							item: share,
						}
					};
				});
			},
		},
	};
};